// @deno-types="@types/express"
import e from 'express'

import tutorials_routes from './tutorials/index.ts'

const app = e()

app.use(e.json())

app.use('/tutorials', tutorials_routes)

export default app
