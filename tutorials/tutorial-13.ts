// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/express-session"
import session from 'express-session'

import { minutesToMilliseconds } from 'libs/utils.ts'

const tutorial_13_routes = e.Router()

tutorial_13_routes.use(cookieParser(Deno.env.get('COOKIE_SECRET_KEY')))

tutorial_13_routes.use(session({
  secret: Deno.env.get('SESSION_SECRET_KEY') ||
    'Please set a value for "SESSION_SECRET_KEY" in .env',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
}))

declare module 'express-session' {
  interface SessionData {
    visited: boolean
  }
}

tutorial_13_routes.get('/api/session', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)

  req.session.visited = true

  res.send('Hello')
})

export default tutorial_13_routes
