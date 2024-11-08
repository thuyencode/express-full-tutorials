// @deno-types="@types/supertest"
import supertest from 'supertest'

import { omit } from '@std/collections/omit'
import { expect } from '@std/expect'
import { afterAll, beforeAll, describe, test } from '@std/testing/bdd'
import app from 'app'
import env from 'libs/env.ts'
import { closeMongodbConnection, startMongodbConnection } from 'mongodb'
import { Server } from 'node:http'
import { ExpressUser } from 'types'

const PARENT_ROUTE = '/tutorials/17'
const ADDRESS = `http://localhost:${env.PORT}${PARENT_ROUTE}`

describe(
  `The ${PARENT_ROUTE}/* routes`,
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  () => {
    let server: Server
    let cookies: string[]

    beforeAll(async () => {
      await startMongodbConnection()
      server = app.listen(env.PORT)
    })

    afterAll(async () => {
      await closeMongodbConnection()
      server.closeAllConnections()
    })

    test(
      'POST /api/users responses with the status code 200 and the created user after submitting valid info',
      async () => {
        const mockedNewUserToBeSubmitted = { username: 'test', name: 'test' }

        const res = await supertest(ADDRESS)
          .post(`/api/users`)
          .send(mockedNewUserToBeSubmitted)

        expect(res.statusCode).toEqual(201)

        expect(omit(JSON.parse(res.text) as ExpressUser, ['id']))
          .toStrictEqual(mockedNewUserToBeSubmitted)
      },
    )

    test(
      'POST /api/auth responses with the status code 200 and cookie after submitting valid credentials',
      async () => {
        const mockedCredentials = { username: 'test', password: 'password' }

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
