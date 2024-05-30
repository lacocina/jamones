import {FastifyInstance} from "fastify";
import {getDBInstance} from "../db/db.ts";
import {Package, RawPackage} from "../types/Package.ts";
import {updatePackage} from "../db/packages.ts";
import {patchPackageToDbMapper, patchPackageToResponseMapper} from "../mappers/patch-package.ts";

export async function getAllPackages(): Promise<Package[]> {
    const db = await getDBInstance()
    const {rows}: { rows: RawPackage[] } = await db.query('SELECT * from jamones.package')
    return rows.map((item: RawPackage): Package => {
        return {
            id: item.id,
            status: item.status,
            hamPrice: item.ham_price,
            dateCreation: item.date_creation,
            dateConfirmed: item.date_confirmed,
            dateReceived: item.date_received,
            dateClosing: item.date_closing,
            shippingCost: item.shipping_cost
        }
    })
}

export async function getPackageDetail(req, reply) {
    const packageId = req.params?.id

    if (packageId) {
        const db = await getDBInstance()
        const {rows: currentPackage} = await db.query(
            `SELECT p.date_closing                                                                                             AS "dateClosing",
                    p.date_confirmed                                                                                           AS "dateConfirmed",
                    p.date_creation                                                                                            AS "dateCreation",
                    p.date_received                                                                                            AS "dateReceived",
                    p.ham_price                                                                                                AS "hamPrice",
                    p.shipping_cost                                                                                            AS "shippingCost",
                    p.status,
                    p.id,
                    p.opened,
                    (SELECT json_agg(customer_order)
                     FROM (SELECT o.id                                         AS "orderId",
                                  o.note,
                                  o.package_id                                 AS "packageId",
                                  o.paid,
                                  c.name,
                                  c.id                                         AS "customerId",
                                  c.last_name                                  AS "lastName",
                                  c.customer_alias                             AS "customerAlias",
                                  (SELECT json_agg(order_line)
                                   FROM (SELECT ol.id, ol.weight
                                         FROM jamones.order_line ol
                                         WHERE ol.order_id = o.id) order_line) as "lines"
                           FROM jamones.customer c
                                    LEFT JOIN jamones.order o ON o.customer_id = c.id AND o.package_id = p.id) customer_order) AS orders
             FROM jamones.package p
             WHERE p.id = $1`,
            [packageId]
        )
        if (currentPackage.length) {
            return {
                ...currentPackage[0],
                hamPrice: parseFloat(currentPackage[0].hamPrice),
                shippingCost: parseFloat(currentPackage[0].shippingCost),
            }
        } else {
            reply.status(404)
            return `No hay ningún paquete con el ID ${packageId}`
        }
    }

    reply.status(400)
    return 'Falta el ID'
}


export async function getCurrentPackage() {
    const db = await getDBInstance()
    const customers = await db.query('SELECT * from jamones.package WHERE opened = true')
    return customers.rows
}

export async function patchPackage(req, reply) {
    if (!req.params.id || isNaN(parseInt(req.params.id))) {
        reply.status(400).send('Falta el ID o no es correcto')
        return
    }
    const packageUpdate = patchPackageToDbMapper(req.body)
    try {
        const { rows } = await updatePackage(
            req.params.id,
            packageUpdate
        )
        if (rows.length == 0) {
            reply.status(404)
            return 'No se ha encontrado el paquete'
        }
        return patchPackageToResponseMapper(rows[0])
    } catch (error) {
        reply.status(500)
        return { message:'Error del servidor', error }
    }
}

export async function updateShippingCost(req, reply) {
    if (!req.params.id || !req.body.shippingCost) {
        reply.status(400)
        return 'Falta el ID o el nuevo precio de los gastos'
    }
    try {
        const db = await getDBInstance()
        const { rows} = await db.query(`UPDATE jamones.package
                                       SET shipping_cost = ${ req.body.shippingCost } ::numeric
                                       WHERE id = ${ req.params.id }
                                       RETURNING shipping_cost`)
        if (rows.length == 0) {
            reply.status(404)
            return 'No se ha encontrado el paquete'
        }
        return { shippingCost: parseFloat(rows[0].shipping_cost) }
    } catch (error) {
        reply.status(500)
        return { message:'Error del servidor', error }
    }
}

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', getAllPackages)

    app.get('/:id', (request, reply) => getPackageDetail(request, reply))

    app.get('/current', getCurrentPackage)

    app.patch('/updateHamPrice/:id', (request, reply) => patchPackage(request, reply))

    app.patch('/updateShippingCost/:id', (request, reply) => patchPackage(request, reply))

    next()
}
