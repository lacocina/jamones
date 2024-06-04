import { Client } from "pg";

export async function getDBInstance() {
    const client = new Client("postgresql://lopollo@localhost:5432/jamones")

    client.on("error", (err) => {
        console.error('Hello Error connecting to db', err.stack)
        process.exit(-1)
    })

    await client.connect()
    return client
}
