// @deno-types="@types/express"
import e from 'express'

import { MONGODB_CONNECTION_URI } from 'libs/constants.ts'
import mongooes from 'mongoose'
import tutorials_routes from './tutorials/index.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = e()

app.use(e.json())

mongooes
  .connect(MONGODB_CONNECTION_URI)
  .then(() => console.info('Connected to MongoDB'))
  .catch((error) => console.error(error))

app.use('/tutorials', tutorials_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
