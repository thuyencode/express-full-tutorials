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

const tutorial_7_routes = e.Router()

tutorial_7_routes.use(e.json())

interface ReqBody {
  username?: string
  name?: string
}

interface ReqParams {
  id: string
}

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
