// @deno-types="@types/express"
import e from 'express'
import MOCKED_USERS from 'libs/constants.ts'
import { ReqQuery } from 'types'

const tutorial_4_routes = e.Router()

tutorial_4_routes.get(
  '/api/users',
  // deno-lint-ignore ban-types
  (req: e.Request<{}, {}, {}, ReqQuery>, res) => {
    const { filter, value } = req.query

    if (filter && value) {
      return res.send(MOCKED_USERS.filter((user) => {
        const result = user[filter]

        if (typeof result === 'string') {
          return result.toLowerCase().includes(value.toLowerCase())
        }

        return result === Number(value)
      }))
    }

    res.send(MOCKED_USERS)
  },
)

export default tutorial_4_routes
