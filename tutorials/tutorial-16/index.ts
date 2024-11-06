// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/passport"
import passport from 'passport'

import sessionStore from 'configs/session/store.ts'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import { COOKIE_SECRET_KEY, SESSION_SECRET_KEY } from 'libs/constants.ts'
import { minutesToMilliseconds } from 'libs/utils.ts'
import { createUserValidationSchema } from 'libs/validation-schemas.ts'
import { ReqBody, WithoutNullableKeys } from 'types'

import './local.strategy.ts'
import prisma from 'prisma/client'

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

const tutorial_16_routes = e.Router()

tutorial_16_routes.use(cookieParser(COOKIE_SECRET_KEY))

tutorial_16_routes.use(session({
  secret: SESSION_SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
  store: sessionStore,
}))

tutorial_16_routes.use(passport.session())

tutorial_16_routes.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  async (
    // deno-lint-ignore ban-types
    req: e.Request<{}, {}, Omit<ReqBody, 'password'>, {}>,
    res: e.Response,
  ) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    const { username, name } = matchedData<
      WithoutNullableKeys<Omit<ReqBody, 'password'>>
    >(req)

    try {
      const newUser = await prisma.user.create({
        data: { username, name, password: 'password' },
      })

      res.status(201).send(newUser)
    } catch (error) {
      res.sendStatus(400)

      console.error(error)
    }
  },
)

tutorial_16_routes.post(
  '/api/auth',
  passport.authenticate('local'),
  (_req, res) => {
    res.status(200).send({ message: 'Authed successfully' })
  },
)

tutorial_16_routes.get(
  '/api/auth/status',
  checkIfAuthedMiddleware,
  (req, res) => {
    res.status(200).send(req.user)
  },
)

tutorial_16_routes.post(
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

export default tutorial_16_routes
