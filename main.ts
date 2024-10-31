// @deno-types="npm:@types/express"
import express from 'npm:express'

const PORT = 8080

const app = express()

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
