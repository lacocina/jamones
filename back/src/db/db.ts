import { Client } from "pg";

const db = new Client("postgresql://lopollo@localhost:5432/jamones")

let connected = false

export async function getDBInstance() {
    if (!connected) {
        db.on("error", (err) => {
            console.error('Error connecting to db', err.stack)
            process.exit(-1)
        })
        await db.connect()
        connected = true
    }
    return db
}
