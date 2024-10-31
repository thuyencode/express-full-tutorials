// deno-lint-ignore-file no-explicit-any
// @deno-types="@types/express"
import express from 'express'

const MOCKED_USERS = [
  { id: 1, username: 'javascript', name: 'JavaScript' },
  { id: 2, username: 'typescript', name: 'TypeScript' },
  { id: 3, username: 'java', name: 'Java' },
  { id: 4, username: 'rust', name: 'Rust' },
  { id: 5, username: 'zig', name: 'Zig' },
  { id: 6, username: 'gdscript', name: 'GDScript' },
] as const

const tutorial_4_routes = express.Router()

interface ReqQuery {
  filter?: keyof typeof MOCKED_USERS[number]
  value?: string
}

tutorial_4_routes.get(
  '/api/users',
  // deno-lint-ignore ban-types
  (req: express.Request<{}, {}, {}, ReqQuery>, res): any => {
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
