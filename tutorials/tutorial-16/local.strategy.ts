// @deno-types="@types/passport"
import passport from 'passport'
// @deno-types="@types/passport-local"
import { Strategy as LocalStrategy } from 'passport-local'

import { pick } from '@std/collections/pick'
import UserModel from 'configs/mongoose/User.model.ts'
import { ExpressUser } from 'types'

const PROPS_TO_BE_KEPT = ['username', 'name', 'id'] as const

passport.serializeUser<ExpressUser['id']>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<ExpressUser['id']>(async (id, done) => {
  try {
    const user = await UserModel.findById(id)

    if (!user) {
      throw new Error(`User with ID "${id}" not found`)
    }

    done(null, pick(user, PROPS_TO_BE_KEPT))
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

      done(null, pick(user, PROPS_TO_BE_KEPT))
    } catch (error) {
      done(error, false)
    }
  }),
)
