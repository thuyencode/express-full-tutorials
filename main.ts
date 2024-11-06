// @deno-types="@types/express"
import e from 'express'

import tutorials_routes from './tutorials/index.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = e()

app.use(e.json())

app.use('/tutorials', tutorials_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
