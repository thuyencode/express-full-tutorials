// @deno-types="@types/express"
import e from 'express'
import tutorial_2_routes from './tutorial-2.ts'
import tutorial_3_routes from './tutorial-3.ts'
import tutorial_4_routes from './tutorial-4.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = e()

app.use('/tutorial-2', tutorial_2_routes)
app.use('/tutorial-3', tutorial_3_routes)
app.use('/tutorial-4', tutorial_4_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
