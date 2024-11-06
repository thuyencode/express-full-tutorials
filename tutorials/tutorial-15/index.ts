// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/passport"
import passport from 'passport'

import { COOKIE_SECRET_KEY, SESSION_SECRET_KEY } from 'libs/constants.ts'
import { minutesToMilliseconds } from 'libs/utils.ts'

import './local-strategy.ts'

const checkIfAuthedMiddleware = (
  req: e.Request,
  res: e.Response,
  next: e.NextFunction,
) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ error: 'Unauthorized request' })
  }

  next()
}

const tutorial_15_routes = e.Router()

tutorial_15_routes.use(cookieParser(COOKIE_SECRET_KEY))

tutorial_15_routes.use(session({
  secret: SESSION_SECRET_KEY,
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
  checkIfAuthedMiddleware,
  (req, res) => {
    res.status(200).send(req.user)
  },
)

tutorial_15_routes.post(
  '/api/auth/logout',
  checkIfAuthedMiddleware,
  (req, res) => {
    req.logOut((error) => {
      if (error) {
        return res.status(500).send({ error })
      }

      res.status(200).send({ message: 'Logout successfully' })
    })
  },
)

export default tutorial_15_routes
