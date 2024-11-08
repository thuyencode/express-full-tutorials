import env from 'libs/env.ts'
import mongooes from 'mongoose'

export const startMongodbConnection = async () => {
  await mongooes
    .connect(env.MONGODB_CONNECTION_URI)
    .then(() => console.info('Connected to MongoDB'))
    .catch((error) => {
      console.error(error)
      Deno.exit(1)
    })
}

export const closeMongodbConnection = async () => {
  if (env.TEST) {
    await mongooes.connection.dropDatabase()
  }

  await mongooes.disconnect()
}
