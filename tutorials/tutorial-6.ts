// @deno-types="@types/express"
import e from 'express'
import MOCKED_USERS from 'libs/constants.ts'
import { ReqBody, ReqParams } from 'types'

const tutorial_6_routes = e.Router()

tutorial_6_routes.put(
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

    const givenId = String(parsedId)
    const findUserIndex = MOCKED_USERS.findIndex(({ id }) => id === givenId)

    if (findUserIndex === -1) {
      return res.status(404).send({
        error: `User with id '${givenId}' not found.`,
      })
    }

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    MOCKED_USERS[findUserIndex] = { id: givenId, ...body }

    res.status(200).send(MOCKED_USERS[findUserIndex])
  },
)

export default tutorial_6_routes
