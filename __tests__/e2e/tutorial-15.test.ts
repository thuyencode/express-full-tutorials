// @deno-types="@types/supertest"
import supertest from 'supertest'

import { expect } from '@std/expect'
import { afterAll, beforeAll, describe, test } from '@std/testing/bdd'
import app from 'app'
import env from 'libs/env.ts'
import { Server } from 'node:http'

const PARENT_ROUTE = '/tutorials/15'
const ADDRESS = `http://localhost:${env.PORT}${PARENT_ROUTE}`

describe.ignore(
  `The ${PARENT_ROUTE}/* routes`,
  () => {
    let server: Server
    let cookies: string[]

    beforeAll(() => {
      server = app.listen(env.PORT)
    })

    afterAll(() => {
      server.closeAllConnections()
    })

    test(
      'POST /api/auth responses with the status code 200 and cookie after submitting valid credentials',
      async () => {
        const mockedCredentials = {
          username: 'javascript',
          password: 'password',
        }

        const res = await supertest(ADDRESS)
          .post(`/api/auth`)
          .send(mockedCredentials)

        expect(res.statusCode).toEqual(200)
        expect(res.get('Set-Cookie')).toBeTruthy()

        cookies = res.get('Set-Cookie') as string[]
      },
    )

    test(
      'GET /api/auth/status responses with the status code 200 and user info after sending a request with the valid cookie',
      async () => {
        const res = await supertest(ADDRESS)
          .get(`/api/auth/status`)
          .set('Cookie', cookies)

        expect(res.statusCode).toEqual(200)
        expect(res.text).toBeTruthy()
      },
    )

    test(
      'POST /api/auth/logout responses with the status code 200 and successfully logging out the user after sending a request with the valid cookie',
      async () => {
        const res = await supertest(ADDRESS)
          .post(`/api/auth/logout`)
          .set('Cookie', cookies)

        expect(res.statusCode).toEqual(200)
      },
    )

    test(
      'GET /api/auth/status responses with the status code 401 after sending a request with the cookie just gets outdated',
      async () => {
        const res = await supertest(ADDRESS)
          .get(`/api/auth/status`)
          .set('Cookie', cookies)

        expect(res.statusCode).toEqual(401)
      },
    )
  },
)
