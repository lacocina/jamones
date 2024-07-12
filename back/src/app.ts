import fastify from "fastify";
import { registerCustomersRoutes } from "./controllers/customers.ts";
import { registerPackagesRoutes } from "./controllers/packages.ts";
import {registerOrderRoutes} from "./controllers/order.ts";
import { registerSwagger } from "./swagger.ts";
import cors from "@fastify/cors";

export const app = fastify()
if (!process.env.PROD) {
  registerSwagger(app)
}

app.register(cors, { origin: true })
app.register(registerCustomersRoutes, { prefix: '/customers' })
app.register(registerPackagesRoutes, { prefix: '/packages' })
app.register(registerOrderRoutes, { prefix: '/orders' })

app.put('/:id', {
  schema: {
    description: 'post some data',
    tags: ['user', 'code'],
    summary: 'qwerty',
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'user id'
        }
      }
    },
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' }
          }
        }
      }
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      },
      default: {
        description: 'Default response',
        type: 'object',
        properties: {
          foo: { type: 'string' }
        }
      }
    },
    security: [
      {
        "apiKey": []
      }
    ]
  }
}, async () => ({ message: 'Hello world!' }))

// Run the server!
try {
  await app.listen({ port: 3000 })
  console.log('Running back on port 3000')
} catch (err) {
  console.error(err)
  process.exit(1)
}
