// sum.test.js
import { expect, test, vi } from 'vitest'
import { getCustomers } from './customers.ts'
import * as db from '../db/db.ts'

test('Customers returns the rows returned by postgres', async () => {
    const spy = vi.spyOn(db,'getDBInstance')
    const rows = [
        { name: 'test' }
    ]
    spy.mockReturnValue({
        // @ts-expect-error type error has no meaning in tests
        query: () => Promise.resolve(({ rows }))
    })
    const customers = await getCustomers()
    expect(customers).toBe(rows)
})
