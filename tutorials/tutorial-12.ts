// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'

import { COOKIE_SECRET_KEY, MOCKED_USERS } from 'libs/constants.ts'
import { addMinutes } from 'libs/utils.ts'

const tutorial_12_routes = e.Router()

tutorial_12_routes.use(cookieParser(COOKIE_SECRET_KEY))

tutorial_12_routes.get('/api/cookie', (_req, res) => {
  res.cookie('hello', 'world', {
    httpOnly: true,
    // maxAge: 60000, // 1 minute,
    expires: addMinutes(new Date(), 1),
    signed: true,
  })
  res.status(200).send({ message: 'Hello!' })
})

tutorial_12_routes.get('/api/users', (req, res) => {
  const cookie = req.signedCookies['hello'] as string || undefined

  if (cookie && cookie === 'world') {
    return res.send(MOCKED_USERS)
  }

  res.status(401).send({ error: 'Unauthorized request.' })
})

export default tutorial_12_routes
