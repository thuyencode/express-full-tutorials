// @deno-types="@types/express-session"
import session from 'express-session'
// @deno-types="@types/connect-mongodb-session"
import ConnectMongoDBSession from 'connect-mongodb-session'
import {
  DATABASE_URL,
  MONGODB_SESSION_COLLECTION_NAME,
} from 'libs/constants.ts'

const MongoDBStore = ConnectMongoDBSession(session)

const sessionStore = new MongoDBStore({
  uri: DATABASE_URL,
  collection: MONGODB_SESSION_COLLECTION_NAME,
})

export default sessionStore
