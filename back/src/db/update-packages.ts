import { getDBInstance } from "./db.ts";
import {RawPackageSimpleUpdate} from "../types/PackageSimple.ts";

export async function updatePackage(packageId: number, rawPackage: RawPackageSimpleUpdate) {
    const db = await getDBInstance()
    return await db.query(
        `UPDATE jamones.package SET ${
            Object.entries(rawPackage)
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => {
                    const finalValue = typeof value === "string" ? `'${value}'` : value
                    return `${key} = ${finalValue}`
                })
                .join(', ')
        }
        WHERE id = ${packageId}
        RETURNING *`)
}
