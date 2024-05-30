import { getDBInstance } from "./db.ts";
import {RawPackageUpdate} from "../types/Package.ts";

export async function updatePackage(packageId: number, rawPackage: RawPackageUpdate) {
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
