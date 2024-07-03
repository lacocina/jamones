import { app as appInstance } from './app.ts'
console.log('Starting servers...')
if (process.env.PROD) {
  appInstance.listen({ port: 3000 })
}
export const app = appInstance
