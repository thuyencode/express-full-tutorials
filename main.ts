// @deno-types="@types/express"
import express from 'express'
import tutorial_2_routes from './tutorial-2/tutorial-2.routes.ts'
import tutorial_3_routes from './tutorial-3/tutorial-3.routes.ts'
import tutorial_4_routes from './tutorial-4/tutorial-4.routes.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = express()

app.use('/tutorial-2', tutorial_2_routes)
app.use('/tutorial-3', tutorial_3_routes)
app.use('/tutorial-4', tutorial_4_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
