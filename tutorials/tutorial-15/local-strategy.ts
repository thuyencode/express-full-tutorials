// @deno-types="@types/passport"
import passport from 'passport'
// @deno-types="@types/passport-local"
import { Strategy as LocalStrategy } from 'passport-local'

import { omit } from '@std/collections/omit'
import { MOCKED_USERS } from 'libs/constants.ts'
import { ExpressUser } from 'types'

passport.serializeUser<ExpressUser['id']>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<ExpressUser['id']>((id, done) => {
  try {
    const user = MOCKED_USERS.find((user) => user.id === id)

    if (!user) {
      throw new Error(`User with ID "${id}" not found`)
    }

    done(null, omit(user, ['password']))
  } catch (error) {
    done(error, null)
  }
})

export default passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      const user = MOCKED_USERS.find((user) => user.username === username)

      if (!user) {
        throw new Error(`User "${username}" not found`)
      }

      if (user.password !== password) {
        throw new Error('Wrong password')
      }

      done(null, omit(user, ['password']))
    } catch (error) {
      done(error)
    }
  }),
)
