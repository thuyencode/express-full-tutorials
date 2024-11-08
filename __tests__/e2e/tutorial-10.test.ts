// @deno-types="@types/supertest"
import supertest from 'supertest'

import { omit } from '@std/collections/omit'
import { expect } from '@std/expect'
import { afterAll, beforeAll, describe, test } from '@std/testing/bdd'
import app from 'app'
import env from 'libs/env.ts'
import { Server } from 'node:http'
import { ExpressUser, ReqQuery } from 'types'

const PARENT_ROUTE = '/tutorials/10'
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
      'POST /api/users responses with the created user after submitting valid info',
      async () => {
        const mockedNewUserToBeSubmitted = { username: 'test', name: 'test' }

        const res = await supertest(ADDRESS)
          .post(`/api/users`)
          .send(mockedNewUserToBeSubmitted)

        expect(res.statusCode).toEqual(201)

        expect(omit(JSON.parse(res.text) as ExpressUser, ['id']))
          .toStrictEqual({
            ...mockedNewUserToBeSubmitted,
            password: 'password',
          })
      },
    )

    test(
      'POST /api/users responses with the status code 400 after submitting invalid info',
      async () => {
        const mockedNewUserToBeSubmitted = { username: '', name: '' }

        const res = await supertest(ADDRESS).post(`/api/users`).send(
          mockedNewUserToBeSubmitted,
        )

        expect(res.statusCode).toEqual(400)
      },
    )

    test(
      'GET /api/users responses with the status code 200 and correctly filtered MOCKED_USERS in JSON after sending a request with correct queries',
      async () => {
        const queries: ReqQuery = { filter: 'username', value: 'java' }
        const expected = JSON.stringify([
          {
            id: '1',
            username: 'javascript',
            name: 'JavaScript',
            password: 'password',
          },
          { id: '3', username: 'java', name: 'Java', password: 'password' },
        ])

        const res = await supertest(ADDRESS).get(`/api/users`).query(queries)

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(expected)
      },
    )

    test(
      'GET /api/users responses with the status code 400 after sending a request with incorrect queries',
      async () => {
        const queries = { filter: '', value: '' }

        const res = await supertest(ADDRESS).get(`/api/users`).query(queries)

        expect(res.statusCode).toEqual(400)
      },
    )
  },
)
