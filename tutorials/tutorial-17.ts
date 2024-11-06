// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/passport"
import passport from 'passport'

import UserModel from 'configs/mongoose/User.model.ts'
import sessionStore from 'configs/session/store.ts'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import { COOKIE_SECRET_KEY, SESSION_SECRET_KEY } from 'libs/constants.ts'
import { hashPassword, minutesToMilliseconds } from 'libs/utils.ts'
import { createUserValidationSchema } from 'libs/validation-schemas.ts'
import { ReqBody, WithoutNullableKeys } from 'types'

import 'configs/passport/local.strategy.ts'

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

const tutorial_17_routes = e.Router()

tutorial_17_routes.use(cookieParser(COOKIE_SECRET_KEY))

tutorial_17_routes.use(session({
  secret: SESSION_SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
  store: sessionStore,
}))

tutorial_17_routes.use(passport.session())

tutorial_17_routes.post(
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

    const password = await hashPassword('password')

    const newUser = new UserModel({ username, name, password })

    try {
      const savedUser = await newUser.save()

      res.status(201).send(savedUser)
    } catch (error) {
      res.sendStatus(400)

      console.error(error)
    }
  },
)

tutorial_17_routes.post(
  '/api/auth',
  passport.authenticate('local'),
  (_req, res) => {
    res.status(200).send({ message: 'Authed successfully' })
  },
)

tutorial_17_routes.get(
  '/api/auth/status',
  checkIfAuthedMiddleware,
  (req, res) => {
    res.status(200).send(req.user)
  },
)

export default tutorial_17_routes
