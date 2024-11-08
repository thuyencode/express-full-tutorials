import app from 'app'
import env from 'libs/env.ts'
import { startMongodbConnection } from 'mongodb'

await startMongodbConnection()

app.listen(env.PORT, () => {
  console.log(`Running on port ${env.PORT}.`)
})
