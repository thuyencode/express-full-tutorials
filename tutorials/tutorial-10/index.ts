// deno-lint-ignore-file ban-types
// @deno-types="@types/express"
import e from 'express'
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from 'express-validator'
import MOCKED_USERS from './constants.ts'
import { ReqBody, ReqQuery, WithoutNullableKeys } from './types.ts'
import { emptyErrorMessage, notStringErrorMessage } from './utils.ts'
import { createUserValidationSchema } from './validation-schemas.ts'

const tutorial_10_routes = e.Router()

tutorial_10_routes.get(
  '/api/users',
  query('filter')
    .isString().withMessage(notStringErrorMessage('filter'))
    .notEmpty().withMessage(emptyErrorMessage('filter')),
  query('value')
    .isString().withMessage(notStringErrorMessage('value'))
    .notEmpty().withMessage(emptyErrorMessage('value')),
  (req: e.Request<{}, {}, {}, ReqQuery>, res) => {
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
  (req: e.Request<{}, {}, ReqBody, {}>, res: e.Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    const { username, name } = matchedData<WithoutNullableKeys<ReqBody>>(req)

    MOCKED_USERS.push({ id: MOCKED_USERS.length + 1, username, name })

    res.status(201).send(MOCKED_USERS[MOCKED_USERS.length - 1])
  },
)

export default tutorial_10_routes
