import { FastifyInstance } from "fastify";
import { getDBInstance } from "../db/db.ts";
import camelcaseKeys from "camelcase-keys";

export async function getAllPackages() {
    const db = await getDBInstance()
    const customers = await db.query('SELECT * from jamones.package')
    return camelcaseKeys(customers.rows)
}

export async function getCurrentPackage() {
    const db = await getDBInstance()
    const customers = await db.query('SELECT * from jamones.package WHERE opened = true')
    return customers.rows
}

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/', getAllPackages)

    app.get('/current', getCurrentPackage)

    next()
}
