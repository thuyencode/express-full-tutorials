// @deno-types="@types/express"
import e from 'express'
import MOCKED_USERS from 'libs/constants.ts'
import { ReqBody, ReqParams } from 'types'

const tutorial_7_routes = e.Router()

tutorial_7_routes.patch(
  '/api/users/:id',
  // deno-lint-ignore ban-types
  (req: e.Request<ReqParams, {}, ReqBody, {}>, res) => {
    const { body, params: { id } } = req

    const parsedId = Number.parseInt(id)

    if (Number.isNaN(parsedId)) {
      return res.status(400).send({
        error: 'The route param :id must be an integer number.',
      })
    }

    const findUserIndex = MOCKED_USERS.findIndex(({ id }) => id === parsedId)

    if (findUserIndex === -1) {
      return res.status(404).send({
        error: `User with id '${parsedId}' not found.`,
      })
    }

    MOCKED_USERS[findUserIndex] = { ...MOCKED_USERS[findUserIndex], ...body }

    res.status(200).send(MOCKED_USERS[findUserIndex])
  },
)

export default tutorial_7_routes
