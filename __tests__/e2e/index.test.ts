// @deno-types="@types/express"
import express from 'express'
// @deno-types="@types/supertest"
import supertest from 'supertest'

import { expect } from '@std/expect'
import { afterAll, beforeAll, describe, test } from '@std/testing/bdd'
import env from 'libs/env.ts'
import { Server } from 'node:http'

describe('Demo GET /', () => {
  let server: Server

  beforeAll(() => {
    const app = express()

    app.get('/', (_req, res) => {
      res.send('Hello Deno!')
    })

    server = app.listen(++env.PORT)
  })

  afterAll(() => {
    server.close()
  })

  test("Responses with the status code 200 and the text 'Hello Deno!'", async () => {
    const res = await supertest(`http://localhost:${env.PORT}`).get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Hello Deno!')
  })
})
