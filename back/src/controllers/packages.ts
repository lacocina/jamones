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
        const customers = await db.query(
            'SELECT * from jamones.package WHERE id = $1',
            [ packageId ]
        )
        if (customers.rows.length) {
            return customers.rows[0]
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

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', getAllPackages)

    app.get('/:id', (request, reply) => getPackageDetail(request, reply))

    app.get('/current', getCurrentPackage)

    next()
}
