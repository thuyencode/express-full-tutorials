// deno-lint-ignore-file ban-ts-comment ban-types
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

const tutorial_9_routes = e.Router()

const loggingMiddleware = (
  req: e.Request,
  _res: e.Response,
  next: e.NextFunction,
) => {
  console.info(`${req.method} - ${req.url}`)
  next()
}

interface ReqParams {
  id: string
}

const resolveIndexByUserIdMiddleware = (
  req: e.Request<ReqParams>,
  res: e.Response,
  next: e.NextFunction,
) => {
  const parsedId = Number.parseInt(req.params.id)

  if (Number.isNaN(parsedId)) {
    return res.status(400).send({ error: 'Bad Request. Invalid ID.' })
  }

  const findUserIndex = MOCKED_USERS.findIndex(({ id }) => id === parsedId)

  if (findUserIndex === -1) {
    return res.status(404).send({
      error: `User with id '${parsedId}' not found.`,
    })
  }

  req.findUserIndex = findUserIndex

  next()
}

tutorial_9_routes.use(loggingMiddleware)

tutorial_9_routes.get('/api/users', (_req, res) => {
  res.send(MOCKED_USERS)
})

tutorial_9_routes.get(
  '/api/users/:id',
  resolveIndexByUserIdMiddleware,
  (req, res) => {
    const { findUserIndex } = req

    res.send(MOCKED_USERS[findUserIndex])
  },
)

tutorial_9_routes.delete(
  '/api/users/:id',
  resolveIndexByUserIdMiddleware,
  (req, res) => {
    const { findUserIndex } = req

    const deletedUser = MOCKED_USERS.splice(findUserIndex, 1)

    res.status(200).send(...deletedUser)
  },
)

interface ReqBody {
  username?: string
  name?: string
}

tutorial_9_routes.patch(
  '/api/users/:id',
  resolveIndexByUserIdMiddleware,
  (req: e.Request<{}, {}, ReqBody, {}>, res) => {
    const { body, findUserIndex } = req

    MOCKED_USERS[findUserIndex] = { ...MOCKED_USERS[findUserIndex], ...body }

    res.status(200).send(MOCKED_USERS[findUserIndex])
  },
)

tutorial_9_routes.put(
  '/api/users/:id',
  resolveIndexByUserIdMiddleware,
  (req: e.Request<{}, {}, ReqBody, {}>, res) => {
    const { body, findUserIndex } = req

    // @ts-ignore
    MOCKED_USERS[findUserIndex] = {
      id: MOCKED_USERS[findUserIndex].id,
      ...body,
    }

    res.status(200).send(MOCKED_USERS[findUserIndex])
  },
)

export default tutorial_9_routes
