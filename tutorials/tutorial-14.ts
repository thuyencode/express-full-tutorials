// deno-lint-ignore-file ban-types
// @deno-types="@types/express"
import e from 'express'
// @deno-types="@types/cookie-parser"
import cookieParser from 'cookie-parser'
// @deno-types="@types/express-session"
import session from 'express-session'

import { checkSchema, matchedData, validationResult } from 'express-validator'
import { MOCKED_USERS } from 'libs/constants.ts'
import { minutesToMilliseconds } from 'libs/utils.ts'
import {
  authUserValidationSchema,
  createCartValidationSchema,
} from 'libs/validation-schemas.ts'
import { CartItem, ReqBody, User, WithoutNullableKeys } from 'types'

declare module 'express-session' {
  interface SessionData {
    user: User
    cart: CartItem[]
  }
}

const tutorial_14_routes = e.Router()

const checkIfAuthedMiddleware = (
  req: e.Request,
  res: e.Response,
  next: e.NextFunction,
) => {
  const user = req.session.user

  if (!user) {
    return res.status(401).send({ error: 'Unauthorized request' })
  }

  next()
}

tutorial_14_routes.use(cookieParser(Deno.env.get('COOKIE_SECRET_KEY')))

tutorial_14_routes.use(session({
  secret: Deno.env.get('SESSION_SECRET_KEY') ||
    'Please set a value for "SESSION_SECRET_KEY" in .env',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: minutesToMilliseconds(1),
  },
}))

tutorial_14_routes.post(
  '/api/auth',
  checkSchema(authUserValidationSchema),
  (req: e.Request<{}, {}, Omit<ReqBody, 'name'>, {}>, res: e.Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    const { username, password } = matchedData<
      WithoutNullableKeys<Omit<ReqBody, 'name'>>
    >(req)

    const user = MOCKED_USERS.find((user) => user.username === username)

    if (!user || user.password !== password) {
      return res.status(401).send({ error: 'Bad credentials' })
    }

    req.session.user = user

    res.status(200).send(user)
  },
)

tutorial_14_routes.get(
  '/api/auth/status',
  checkIfAuthedMiddleware,
  (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
      if (err) {
        res.status(401).send(err)
      }

      res.status(200).send(session)
    })
  },
)

tutorial_14_routes.post(
  '/api/cart',
  checkIfAuthedMiddleware,
  checkSchema(createCartValidationSchema),
  (req: e.Request<{}, {}, CartItem, {}>, res: e.Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    const item = matchedData<WithoutNullableKeys<CartItem>>(req)
    const cart = req.session.cart

    if (cart) {
      cart.push(item)
    } else {
      req.session.cart = [item]
    }

    res.status(201).send(item)
  },
)

tutorial_14_routes.get(
  '/api/cart',
  (req, res) => {
    const cart = req.session.cart || []

    return res.status(200).send(cart)
  },
)

export default tutorial_14_routes
