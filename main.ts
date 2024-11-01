// @deno-types="@types/express"
import e from 'express'
import tutorial_2_routes from './tutorial-2.ts'
import tutorial_3_routes from './tutorial-3.ts'
import tutorial_4_routes from './tutorial-4.ts'
import tutorial_5_routes from './tutorial-5.ts'
import tutorial_6_routes from './tutorial-6.ts'

const PORT = Deno.env.get('PORT') || 8080

const app = e()

app.use('/tutorial-2', tutorial_2_routes)
app.use('/tutorial-3', tutorial_3_routes)
app.use('/tutorial-4', tutorial_4_routes)
app.use('/tutorial-5', tutorial_5_routes)
app.use('/tutorial-6', tutorial_6_routes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`)
})
