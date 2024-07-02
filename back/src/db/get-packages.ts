import { getDBInstance } from "./db.ts";
import {RawPackage} from "../types/Package.ts";

export async function getPackagesDB() {
    const db = await getDBInstance()
    const { rows: packages }: { rows: RawPackage[] } = await db.query(
        `SELECT *,
                    (SELECT json_agg(order_data)
                     FROM (SELECT o.id                                  AS "order_id",
                                  o.customer_id                         as "customer_id",
                                  o.paid,
                                  o.package_id,
                                  o.note,
                                  o.pre_lines,
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
    return packages
}
