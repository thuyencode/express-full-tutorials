// @deno-types="@types/supertest"
import supertest from 'supertest'

import { expect } from '@std/expect'
import { afterAll, beforeAll, describe, test } from '@std/testing/bdd'
import app from 'app'
import { MOCKED_USERS } from 'libs/constants.ts'
import env from 'libs/env.ts'
import { Server } from 'node:http'

const PARENT_ROUTE = '/tutorials/8'
const ADDRESS = `http://localhost:${env.PORT}${PARENT_ROUTE}`

describe(
  `The ${PARENT_ROUTE}/* routes`,
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  () => {
    let server: Server

    beforeAll(() => {
      server = app.listen(env.PORT)
    })

    afterAll(() => {
      server.close()
    })

    test(
      'GET /api/users responses with the status code 200 and MOCKED_USERS in JSON',
      async () => {
        const res = await supertest(ADDRESS).get(`/api/users`)

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(JSON.stringify(MOCKED_USERS))
      },
    )

    test(
      'DELETE /api/users/:id responses with the status code 200 and the deleted user',
      async () => {
        const expectedUserToBeDeleted = MOCKED_USERS[0]
        const userId = expectedUserToBeDeleted.id

        const res = await supertest(ADDRESS).delete(`/api/users/${userId}`)

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(JSON.stringify(expectedUserToBeDeleted))
      },
    )
  },
)
