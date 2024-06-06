import { getDBInstance } from "./db.ts";
import {RawPackageSimpleUpdate} from "../types/PackageSimple.ts";

export async function updatePackage(packageId: number, rawPackage: RawPackageSimpleUpdate) {
    const db = await getDBInstance()
    return await db.query(
        `UPDATE jamones.package ${
            Object.entries(rawPackage)
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => `SET ${key} = ${value}`)
                .join(', ')
        }
        WHERE id = ${packageId}
        RETURNING *`)
}
