// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/passport"
import passport from 'passport'

import { minutesToMilliseconds } from 'libs/utils.ts'
import './local-strategy.ts'

const tutorial_15_routes = e.Router()

tutorial_15_routes.use(cookieParser(Deno.env.get('COOKIE_SECRET_KEY')))

tutorial_15_routes.use(session({
  secret: Deno.env.get('SESSION_SECRET_KEY') ||
    'Please set a value for "SESSION_SECRET_KEY" in .env',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
}))

tutorial_15_routes.use(passport.session())

tutorial_15_routes.post(
  '/api/auth',
  passport.authenticate('local'),
  (_req, res) => {
    res.status(200).send({ message: 'Authed successfully' })
  },
)

tutorial_15_routes.get(
  '/api/auth/status',
  (req, res) => {
    const user = req.user

    if (!user) {
      res.status(401).send({ error: 'Unauthorized request' })
    }

    res.status(200).send(user)
  },
)

export default tutorial_15_routes
