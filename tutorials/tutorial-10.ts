// deno-lint-ignore-file ban-types
// @deno-types="@types/express"
import e from 'express'
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from 'express-validator'
import MOCKED_USERS from 'libs/constants.ts'
import { ReqBody, ReqQuery, WithoutNullableKeys } from 'types'
import { emptyErrorMessage, notStringErrorMessage } from 'libs/utils.ts'
import { createUserValidationSchema } from 'libs/validation-schemas.ts'

const tutorial_10_routes = e.Router()

tutorial_10_routes.get(
  '/api/users',
  query('filter')
    .isString().withMessage(notStringErrorMessage('filter'))
    .notEmpty().withMessage(emptyErrorMessage('filter')),
  query('value')
    .isString().withMessage(notStringErrorMessage('value'))
    .notEmpty().withMessage(emptyErrorMessage('value')),
  (req: e.Request<{}, {}, {}, ReqQuery>, res: e.Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    const { filter, value } = matchedData<WithoutNullableKeys<ReqQuery>>(req)

    res.send(MOCKED_USERS.filter((user) => {
      const result = user[filter]

      if (typeof result === 'string') {
        return result.toLowerCase().includes(value.toLowerCase())
      }

      return result === Number(value)
    }))
  },
)

tutorial_10_routes.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  (
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

    MOCKED_USERS.push({
      id: String(MOCKED_USERS.length + 1),
      username,
      name,
      password: 'password',
    })

    res.status(201).send(MOCKED_USERS[MOCKED_USERS.length - 1])
  },
)

export default tutorial_10_routes
