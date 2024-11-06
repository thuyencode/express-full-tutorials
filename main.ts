// @deno-types="@types/express"
import e from 'express'

import env from 'libs/env.ts'
import mongooes from 'mongoose'
import tutorials_routes from './tutorials/index.ts'

const PORT = env.PORT

const app = e()

app.use(e.json())

mongooes
  .connect(env.MONGODB_CONNECTION_URI)
  .then(() => console.info('Connected to MongoDB'))
  .catch((error) => console.error(error))

app.use('/tutorials', tutorials_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
