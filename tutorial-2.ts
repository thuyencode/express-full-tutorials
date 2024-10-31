// @deno-types="@types/express"
import e from 'express'

const tutorial_2_routes = e.Router()

tutorial_2_routes.get('/', (_req, res) => {
  res.status(201).send({ message: 'Hello, World!' })
})

tutorial_2_routes.get('/api/users', (_req, res) => {
  res.send([
    { id: 1, username: 'hello', name: 'Hello' },
    { id: 2, username: 'world', name: 'World' },
  ])
})

tutorial_2_routes.get('/api/products', (_req, res) => {
  res.send([
    { id: 1, product: 'deno', version: '2' },
    { id: 2, product: 'nodejs', name: '23' },
  ])
})

export default tutorial_2_routes
