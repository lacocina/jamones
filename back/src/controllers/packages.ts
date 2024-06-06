import { FastifyInstance } from "fastify";
import { getDBInstance } from "../db/db.ts";
import { updatePackage } from "../db/packages.ts";
import { patchPackageToDbMapper, patchPackageToResponseMapper } from "../mappers/patch-package.ts";
import { RawPackage } from "../types/Package.ts";
import {packageToResponseMapper} from "../mappers/package.ts";

export async function getPackages(req, reply) {
    try {
        const db = await getDBInstance()
        const {rows: packages}: { rows: RawPackage[] } = await db.query(
            `SELECT *,
                    (SELECT json_agg(order_data)
                     FROM (SELECT o.id                                  AS "order_id",
                                  o.customer_id                         as "customer_id",
                                  o.paid,
                                  o.package_id,
                                  o.note,
                                  c.name,
                                  c.last_name,
                                  c.customer_alias,
                                  (SELECT json_agg(line_data)
                                   FROM (SELECT *
                                         FROM jamones.order_line ol
                                         WHERE o.id = ol.order_id) line_data) AS lines
                           FROM jamones.order o
                                    LEFT JOIN jamones.customer c ON o.customer_id = c.id
                           WHERE o.package_id = p.id) order_data)
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

    app.get('/list', (request, reply) => getPackages(request, reply))

    app.patch('/updatePackage/:id', (request, reply) => patchPackage(request, reply))

    next()
}
