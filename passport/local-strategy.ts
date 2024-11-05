// @deno-types="@types/passport"
import passport from 'passport'
// @deno-types="@types/passport-local"
import { Strategy as LocalStrategy } from 'passport-local'

import { pick } from '@std/collections/pick'
import UserModel from 'mongoose/User.model.ts'

passport.serializeUser<Express.User['id']>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<Express.User['id']>(async (id, done) => {
  try {
    const user = await UserModel.findById(id)

    if (!user) {
      throw new Error(`User with ID "${id}" not found`)
    }

    done(null, pick(user, ['username', 'name', 'id']))
  } catch (error) {
    done(error, false)
  }
})

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username })

      if (!user) {
        throw new Error(`User '${username}' not found`)
      }

      if (user.password !== password) {
        throw new Error('Wrong password')
      }

      done(null, pick(user, ['username', 'name', 'id']))
    } catch (error) {
      done(error, false)
    }
  }),
)
