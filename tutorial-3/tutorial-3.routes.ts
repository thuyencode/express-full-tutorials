// @deno-types="@types/express"
import e from 'express'

const MOCKED_USERS = [
  { id: 1, username: 'hello', name: 'Hello' },
  { id: 2, username: 'world', name: 'World' },
] as const

const tutorial_3_routes = e.Router()

// deno-lint-ignore no-explicit-any
tutorial_3_routes.get('/api/users/:id', (req, res): any => {
  const parsedId = Number.parseInt(req.params.id)

  if (Number.isNaN(parsedId)) {
    return res.status(400).send({ error: 'Bad Request. Invalid ID.' })
  }

  const user = MOCKED_USERS.find(({ id }) => id === parsedId)

  if (!user) {
    return res.status(404).send({
      error: `User with id '${parsedId}' not found.`,
    })
  }

  res.send(user)
})

export default tutorial_3_routes
