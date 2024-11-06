// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/passport"
import passport from 'passport'

import sessionStore from 'configs/session/store.ts'
import env from 'libs/env.ts'
import { minutesToMilliseconds } from 'libs/utils.ts'

import 'configs/passport/discord.strategy.ts'

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

const tutorial_19_routes = e.Router()

tutorial_19_routes.use(cookieParser(env.COOKIE_SECRET_KEY))

tutorial_19_routes.use(session({
  secret: env.SESSION_SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
  store: sessionStore,
}))

tutorial_19_routes.use(passport.session())

tutorial_19_routes.get('/api/auth/discord', passport.authenticate('discord'))

tutorial_19_routes.get(
  '/api/auth/discord/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/auth/discord',
  }),
  (_req, res) => {
    res.sendStatus(200)
  },
)

tutorial_19_routes.get(
  '/api/auth/status',
  checkIfAuthedMiddleware,
  (req, res) => {
    res.status(200).send(req.user)
  },
)

export default tutorial_19_routes
