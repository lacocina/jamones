import { FastifyInstance } from "fastify";

export async function updateOrder(req, reply) {
    return { message: 'hello' }
}

export async function deleteOrder(req, reply) {
    try {
        return { message: 'Delete' }
    } catch (error) {
        reply.status(500)
        return { message:'Error del servidor', error }
    }
}

export const registerOrderRoutes = (app: FastifyInstance, opts, next: any) => {

    app.patch('/:id', (request, reply) => updateOrder(request, reply))

    app.delete('/:id', (request, reply) => deleteOrder(request, reply))

    next()
}
