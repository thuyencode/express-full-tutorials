// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/connect-mongodb-session"
import ConnectMongoDBSession from 'connect-mongodb-session'

import env from 'libs/env.ts'

const MongoDBStore = ConnectMongoDBSession(session)

const sessionStore = new MongoDBStore({
  uri: env.MONGODB_CONNECTION_URI,
  collection: env.MONGODB_SESSION_COLLECTION_NAME,
})

export default sessionStore
