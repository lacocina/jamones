import { getDBInstance } from "./db.ts";
import {Client} from "pg";
import {RawCustomerOrder} from "../types/CustomerOrder.ts";

async function checkPackage(db: Client, packageId: number) {
    const packageResult = await db.query(`
            SELECT EXISTS (
                SELECT 1
                FROM jamones."package"
                WHERE id = $1
              ) AS exists;`,
        [packageId]);

    if (!packageResult.rows[0].exists) {
        throw new Error(`Package with id ${packageId} not found`);
    }
    return true
}

async function checkCustomer(db: Client, customerId: number) {
    const customerResult = await db.query(`
                SELECT EXISTS (
                    SELECT 1
                    FROM jamones."customer"
                    WHERE id = $1
                ) AS exists;`,
        [customerId]);

    if (!customerResult.rows[0].exists) {
        throw new Error(`Customer with id ${customerId} not found`);
    }
    return true
}

async function resetOrCreateOrder(db: Client, packageId: number, customerId: number) : Promise<number> {
    let orderId: number;
    // Comprobar si ya existe el order
    const { rows: targetOrder } = await db.query(`
            SELECT id FROM jamones."order" WHERE package_id = $1 AND customer_id = $2`,
        [packageId, customerId]);

    if (targetOrder.length > 0) {
        // Si existe usamos su id para eliminar los lines
        orderId = targetOrder[0].id
        await db.query(`
                DELETE FROM jamones.order_line WHERE order_id = $1`,
            [orderId])
    } else {
        // Si no creamos un nuevo order y recogemos su id
        const newOrder = await db.query(`
                        INSERT INTO jamones."order" (package_id, customer_id, paid)
                        VALUES ($1, $2, FALSE)
                        RETURNING id`,
            [packageId, customerId])
        orderId = newOrder.rows[0].id
    }

    return orderId
}

async function getBuildOrder(db: Client, orderId: number) {
    const { rows: responseOrder } : { rows: RawCustomerOrder[] } = await db.query(`
        SELECT
            o.id                                  AS "order_id",
            o.customer_id                         as "customer_id",
            o.paid,
            o.package_id,
            o.note,
            c.name,
            c.last_name,
            c.customer_alias,
            (SELECT json_agg(line_data)
             FROM (SELECT
                       ol.id,
                       ol.order_id,
                       ol.weight
                   FROM jamones.order_line ol
                   WHERE o.id = ol.order_id) line_data) AS lines
        FROM jamones."order" o
            LEFT JOIN jamones.customer c ON o.customer_id = c.id
        WHERE o.id = $1`,
    [orderId])
    return responseOrder[0]
}

export async function updateOrder(
    { packageId, customerId, lines } : { packageId: number, customerId: number, lines: number },
) : Promise<RawCustomerOrder> {
    const db = await getDBInstance()
    try {
        await db.query(`BEGIN`)
        await checkPackage(db, packageId)
        await checkCustomer(db, customerId)

        const orderId = await resetOrCreateOrder(db, packageId, customerId)

        // Agregamos los lines
        for (let i = 0; i < lines; i++) {
            await db.query(`
                INSERT INTO jamones."order_line" (order_id) VALUES ($1)`,
                [orderId])
        }

        const responseOrder: RawCustomerOrder = await getBuildOrder(db, orderId)
        await db.query(`COMMIT`)

        return responseOrder

    } catch (e) {
        console.log(e)
        return e
    }
}
