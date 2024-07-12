import { FastifyInstance } from "fastify";
import { updatePackage } from "../db/update-packages.ts";
import { updateNumberOrderLinesDB } from "../db/update-order.ts";
import {getPackagesDB} from "../db/get-packages.ts";
import { patchPackageToDbMapper, patchPackageToResponseMapper } from "../mappers/patch-package.ts";
import {customerOrderToResponseMapper, packageToResponseMapper} from "../mappers/package.ts";

export async function getPackages(req, reply) {
    try {
        const packages = await getPackagesDB()
        if (packages.length) return packages?.map(packageToResponseMapper)

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

export async function updateNumberOrderLines(req, reply) {
    if (
        !req.body.packageId || isNaN(parseInt(req.body.packageId))
        || !req.body.customerId || isNaN(parseInt(req.body.customerId))
        || !req.body.lines || isNaN(parseInt(req.body.lines))
    ) {
        reply.status(400).send('Falta el ID del paquete o el ID customer o las líneas o no los tipos son correctos')
        return
    }
    try {
        const responseOrder = await updateNumberOrderLinesDB(req.body)
        return customerOrderToResponseMapper(responseOrder)
    } catch (error) {
        reply.status(500)
        return { message:'Error del servidor', error }
    }
}

export const registerPackagesRoutes = (app: FastifyInstance, opts, next: any) => {

    app.get('/list', (request, reply) => getPackages(request, reply))

    app.patch('/updatePackage/:id', (request, reply) => patchPackage(request, reply))

    app.post('/updateNumberOrderLines', (request, reply) => updateNumberOrderLines(request, reply))

    next()
}
