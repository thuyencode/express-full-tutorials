// @deno-types="@types/express"
import e from 'express'
import { MOCKED_USERS } from 'libs/constants.ts'
import { ReqBody } from 'types'

const tutorial_5_routes = e.Router()

tutorial_5_routes.post(
  '/api/users',
  // deno-lint-ignore ban-types
  (req: e.Request<{}, {}, Omit<ReqBody, 'password'>, {}>, res) => {
    const { username, name } = req.body

    if (username && name) {
      MOCKED_USERS.push({
        id: String(MOCKED_USERS.length + 1),
        username,
        name,
        password: 'password',
      })

      return res.status(201).send(MOCKED_USERS)
    }

    res.status(400).send({
      error:
        "Bad Request. Valid values for 'username' and 'name' are required.",
    })
  },
)

export default tutorial_5_routes
