import { FastifyInstance } from "fastify";
import { getDBInstance } from "../db/db.ts";
import { Package, RawPackage } from "../types/Package.ts";

export async function getAllPackages() : Promise<Package[]> {
    const db = await getDBInstance()
    const { rows } : { rows: RawPackage[] } = await db.query('SELECT * from jamones.package')
    return rows.map((item: RawPackage) : Package => {
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
        const { rows: currentPackage } = await db.query<Package>(
            'SELECT ' +
                'p.date_closing AS "dateClosing", ' +
                'p.date_confirmed AS "dateConfirmed", ' +
                'p.date_creation AS "dateCreation", ' +
                'p.date_received AS "dateReceived", ' +
                'p.ham_price AS "hamPrice", ' +
                'p.shipping_cost AS "shippingCost", ' +
                'p.status, ' +
                'p.id, ' +
                'p.opened ' +
            'FROM ' +
                'jamones.package p ' +
            'WHERE ' +
                `p.id = $1`,
            [ packageId ]
        )
        const { rows : orders } = await db.query(
            'SELECT ' +
                'o.id AS "orderId", ' +
                'o.package_id AS "packageId", ' +
                'o.customer_id AS "customerId", ' +
                'o.paid, ' +
                'c.name AS "name", ' +
                'c.last_name AS "lastName", ' +
                'c.customer_alias AS "customerAlias" ' +
            'FROM ' +
                'jamones.package p ' +
            'LEFT JOIN ' +
                'jamones.order o ON p.id = o.package_id ' +
            'LEFT JOIN ' +
                'jamones.customer c ON o.customer_id = c.id ' +
            'WHERE ' +
                `p.id = $1`,
            [ packageId ]
        )
        if (currentPackage.length) {
            return {
                ...currentPackage[0],
                hamPrice : parseFloat(currentPackage[0].hamPrice),
                shippingCost : parseFloat(currentPackage[0].shippingCost),
                orders
            }
        } else {
            reply.status(404)
            return `No hay ningún paquete con el ID ${ packageId }`
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

export async function updateHamPrice(req, reply) {
    if (req.params.id && req.body.hamPrice) {
        try {
            const db = await getDBInstance()
            await db.query(`UPDATE jamones.package SET ham_price = ${req.body.hamPrice} ::numeric WHERE id = ${req.params.id}`)
            const { rows } = await db.query(`SELECT ham_price FROM jamones.package WHERE id = ${req.params.id}`)
            return { hamPrice: parseFloat(rows[0].ham_price) }
        } catch (e) {
            reply.status(500)
            return 'Error del servidor'
        }
    }

    reply.status(400)
    return 'Falta el ID o el precio del jamón'
}

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', getAllPackages)

    app.get('/:id', (request, reply) => getPackageDetail(request, reply))

    app.get('/current', getCurrentPackage)

    app.patch('/updateHamPrice/:id', (request, reply) => updateHamPrice(request, reply))

    next()
}
