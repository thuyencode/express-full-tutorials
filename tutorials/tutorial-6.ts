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

const tutorial_6_routes = e.Router()

tutorial_6_routes.use(e.json())

interface ReqBody {
  username?: string
  name?: string
}

interface ReqParams {
  id: string
}

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

    const findUserIndex = MOCKED_USERS.findIndex(({ id }) => id === parsedId)

    if (findUserIndex === -1) {
      return res.status(404).send({
        error: `User with id '${parsedId}' not found.`,
      })
    }

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    MOCKED_USERS[findUserIndex] = { id: parsedId, ...body }

    res.status(200).send(MOCKED_USERS[findUserIndex])
  },
)

export default tutorial_6_routes
