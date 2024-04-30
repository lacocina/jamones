import { FastifyInstance } from "fastify";
import { getDBInstance } from "../db/db.ts";

export async function getCustomers() {
    const db = await getDBInstance()
    const customers = await db.query('SELECT id, name, last_name, email, phone from jamones.customer')
    return customers.rows
}

export async function getCustomer(req, reply) {
    const db = await getDBInstance()
    const id = req.params.id
    const customers = await db.query('SELECT id, name, last_name, email, phone from jamones.customer where id = $1', [id])
    return customers.rows[0]
}

export async function createCustomer(req, reply) {
    const newCustomer = req.body
    // INSERT INTO table_name (column1, column2, column3,etc)
    // VALUES (value1, value2, value3, etc);

    if (newCustomer?.name) {
        const db = await getDBInstance()
        const customers = await db.query(
            'INSERT INTO jamones.customer (name, last_name, email, phone) values ($1, $2, $3, $4)',
            [newCustomer.name, newCustomer.last_name, newCustomer.email, newCustomer.phone]
        )
        return customers.rows
    }

    reply.status(500)
    return 'Algo ha ido mal'
}

export const registerCustomersRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/', getCustomers)

    app.get('/:id', (request, reply) => getCustomer(request, reply))

    app.post('/', createCustomer)

    next()
}
