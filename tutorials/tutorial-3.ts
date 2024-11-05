// @deno-types="@types/express"
import e from 'express'
import { MOCKED_USERS } from 'libs/constants.ts'

const tutorial_3_routes = e.Router()

tutorial_3_routes.get('/api/users/:id', (req, res) => {
  const parsedId = Number.parseInt(req.params.id)

  if (Number.isNaN(parsedId)) {
    return res.status(400).send({ error: 'Bad Request. Invalid ID.' })
  }

  const id = String(parsedId)

  const user = MOCKED_USERS.find((user) => user.id === id)

  if (!user) {
    return res.status(404).send({
      error: `User with id '${parsedId}' not found.`,
    })
  }

  res.send(user)
})

export default tutorial_3_routes
