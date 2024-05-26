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
        const { rows: currentPackage } = await db.query(
            '' +
            'SELECT ' +
                'p.date_closing AS "dateClosing", ' +
                'p.date_confirmed AS "dateConfirmed", ' +
                'p.date_creation AS "dateCreation", ' +
                'p.date_received AS "dateReceived", ' +
                'p.ham_price AS "hamPrice", ' +
                'p.shipping_cost AS "shippingCost", ' +
                'p.status, ' +
                'p.id, ' +
                'p.opened, ' +
                '( ' +
                    'SELECT json_agg(order_details) ' +
                    'FROM ( ' +
                        'SELECT ' +
                            'o.id AS "orderId", ' +
                            'o.note, ' +
                            'o.package_id AS "packageID", ' +
                            'o.paid, ' +
                            'c.name, ' +
                            'c.id AS "customerId", ' +
                            'c.last_name AS "lastName", ' +
                            'c.customer_alias AS customerAlias, ' +
                            '( ' +
                                'SELECT json_agg(order_line) ' +
                                'FROM ( ' +
                                    'SELECT ' +
                                        'ol.id, ' +
                                        'ol.weight ' +
                                    'FROM ' +
                                        'jamones.order_line ol ' +
                                    'WHERE ' +
                                        'ol.order_id = o.id ' +
                                ') order_line ' +
                            ') as "orderLines" ' +
                        'FROM ' +
                            'jamones.order o ' +
                        'LEFT JOIN ' +
                            'jamones.customer c ON o.customer_id = c.id ' +
                        'WHERE ' +
                            'o.package_id = p.id ' +
                    ') order_details ' +
                ') AS orders ' +
            'FROM ' +
                'jamones.package p ' +
            'WHERE ' +
                'p.id = $1',
            [packageId]
            )
        if (currentPackage.length) {
            return {
                ...currentPackage[0],
                hamPrice : parseFloat(currentPackage[0].hamPrice),
                shippingCost : parseFloat(currentPackage[0].shippingCost),
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

async function updatePackageProperty (req, reply, params: { dbName: string, returnName: string }) {
    if (req.params.id && req.body[params.returnName]) {
        try {
            const db = await getDBInstance()
            await db.query(`UPDATE jamones.package SET ${params.dbName} = ${req.body[params.returnName]} ::numeric WHERE id = ${req.params.id}`)
            const { rows } = await db.query(`SELECT ${params.dbName} FROM jamones.package WHERE id = ${req.params.id}`)
            return { [params.returnName]: parseFloat(rows[0][params.dbName]) }
        } catch (e) {
            reply.status(500)
            return 'Error del servidor'
        }
    }

    reply.status(400)
    return 'Falta el ID o el precio del jamón'
}

export async function updateHamPrice(req, reply) {
    return await updatePackageProperty(req, reply, {
        dbName: 'ham_price',
        returnName: 'hamPrice'
    })
}

export async function updateShippingCost(req, reply) {
    return await updatePackageProperty(req, reply, {
        dbName: 'shipping_cost',
        returnName: 'shippingCost'
    })
}

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', getAllPackages)

    app.get('/:id', (request, reply) => getPackageDetail(request, reply))

    app.get('/current', getCurrentPackage)

    app.patch('/updateHamPrice/:id', (request, reply) => updateHamPrice(request, reply))

    app.patch('/updateShippingCost/:id', (request, reply) => updateShippingCost(request, reply))

    next()
}
