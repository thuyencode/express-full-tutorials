// @deno-types="@types/express"
import e from 'express'

const MOCKED_USERS = [
  { id: 1, username: 'javascript', name: 'JavaScript' },
  { id: 2, username: 'typescript', name: 'TypeScript' },
  { id: 3, username: 'java', name: 'Java' },
  { id: 4, username: 'rust', name: 'Rust' },
  { id: 5, username: 'zig', name: 'Zig' },
  { id: 6, username: 'gdscript', name: 'GDScript' },
]

const tutorial_8_routes = e.Router()

tutorial_8_routes.get('/api/users/', (_req, res) => {
  res.send(MOCKED_USERS)
})

interface ReqParams {
  id: string
}

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

    const findUserIndex = MOCKED_USERS.findIndex(({ id }) => id === parsedId)

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
