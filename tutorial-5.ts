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

const tutorial_5_routes = e.Router()

tutorial_5_routes.use(e.json())

interface ReqBody {
  username?: string
  name?: string
}

tutorial_5_routes.post(
  '/api/users',
  // deno-lint-ignore ban-types
  (req: e.Request<{}, {}, ReqBody, {}>, res) => {
    const { username, name } = req.body

    if (username && name) {
      MOCKED_USERS.push({ id: MOCKED_USERS.length + 1, username, name })

      return res.status(201).send(MOCKED_USERS)
    }

    res.status(400).send({
      error:
        "Bad Request. Valid values for 'username' and 'name' are required.",
    })
  },
)

export default tutorial_5_routes
