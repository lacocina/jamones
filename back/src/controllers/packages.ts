import { FastifyInstance } from "fastify";
import { getDBInstance } from "../db/db.ts";
import { PackageSimple, RawPackageSimple } from "../types/PackageSimple.ts";
import { updatePackage } from "../db/packages.ts";
import { patchPackageToDbMapper, patchPackageToResponseMapper } from "../mappers/patch-package.ts";
import { RawPackage } from "../types/Package.ts";
import {packageToResponseMapper} from "../mappers/package.ts";

export async function getAllPackages(): Promise<PackageSimple[]> {
    const db = await getDBInstance()
    const {rows}: { rows: RawPackageSimple[] } = await db.query('SELECT * from jamones.package')
    return rows.map((item: RawPackageSimple): PackageSimple => {
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
            `SELECT p.date_closing   AS "dateClosing",
                    p.date_confirmed AS "dateConfirmed",
                    p.date_creation  AS "dateCreation",
                    p.date_received  AS "dateReceived",
                    p.ham_price      AS "hamPrice",
                    p.shipping_cost  AS "shippingCost",
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
                                    LEFT JOIN jamones.order o ON o.customer_id = c.id AND o.package_id = p.id) customer_order)
                                     AS orders
             FROM jamones.package p`
        )
        if (currentPackage.length) {
            return {
                ...currentPackage[0],
                hamPrice: parseFloat(currentPackage[0].hamPrice),
                shippingCost: parseFloat(currentPackage[0].shippingCost),
                all: currentPackage
            }
        } else {
            reply.status(404)
            return `No hay ningún paquete con el ID ${packageId}`
        }
    }

    reply.status(400)
    return 'Falta el ID'
}

export async function getAllPackageDetails(req, reply) {
    try {
        const db = await getDBInstance()
        const { rows: packages } : { rows: RawPackage[] } = await db.query(
            `SELECT
                    p.id,
                    p.date_closing,
                    p.date_confirmed,
                    p.date_creation,
                    p.date_received,
                    p.date_closing,
                    p.ham_price,
                    p.shipping_cost,
                    p.status,
                    p.opened,
                    (SELECT json_agg(customer_order)
                     FROM (SELECT o.id AS "order_id",
                                  o.note,
                                  o.package_id,
                                  o.paid,
                                  c.name,
                                  c.id AS "customer_id",
                                  c.last_name,
                                  c.customer_alias,
                                  (SELECT json_agg(order_line)
                                   FROM (SELECT ol.id, ol.weight
                                         FROM jamones.order_line ol
                                         WHERE ol.order_id = o.id) order_line) as "lines"
                           FROM jamones.customer c
                                    LEFT JOIN jamones.order o ON o.customer_id = c.id AND o.package_id = p.id) customer_order)
                                     AS orders
             FROM jamones.package p`
        )

        if (packages.length) {
            return packages?.map(packageToResponseMapper)
        }

        reply.status(404).send('Aún no hay paquetes')
        return []

    } catch (error) {
        reply.status(500).send('Error del servidor')
        return { message:'Error del servidor', error }
    }
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

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', getAllPackages)

    app.get('/list-details', (request, reply) => getAllPackageDetails(request, reply))

    app.get('/:id', (request, reply) => getPackageDetail(request, reply))

    app.patch('/updatePackage/:id', (request, reply) => patchPackage(request, reply))

    next()
}
