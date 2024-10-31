// @deno-types="@types/express"
import express from 'express'
import tutorial_2_routes from './tutorial-2/routes.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = express()

app.use('/tutorial-2', tutorial_2_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
