// @deno-types="@types/express"
import e from 'express'
import { MOCKED_USERS } from 'libs/constants.ts'
import { ReqParams } from 'types'

const tutorial_8_routes = e.Router()

tutorial_8_routes.get('/api/users/', (_req, res) => {
  res.send(MOCKED_USERS)
})

tutorial_8_routes.delete(
  '/api/users/:id',
  // deno-lint-ignore ban-types
  (req: e.Request<ReqParams, {}, {}, {}>, res) => {
    const parsedId = Number.parseInt(req.params.id)

    if (Number.isNaN(parsedId)) {
      return res.status(400).send({
        error: 'The route param :id must be an integer number.',
      })
    }

    const id = String(parsedId)

    const findUserIndex = MOCKED_USERS.findIndex((user) => user.id === id)

    if (findUserIndex === -1) {
      return res.status(404).send({
        error: `User with id '${parsedId}' not found.`,
      })
    }

    const deletedUser = MOCKED_USERS.splice(findUserIndex, 1)

    res.status(200).send(...deletedUser)
  },
)

export default tutorial_8_routes
