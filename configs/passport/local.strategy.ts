// @deno-types="@types/passport"
import passport from 'passport'
// @deno-types="@types/passport-local"
import { Strategy as LocalStrategy } from 'passport-local'

import { omit } from '@std/collections/omit'
import { comparePasswords } from 'libs/utils.ts'
import prisma from 'prisma/client'

passport.serializeUser<Express.User['id']>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<Express.User['id']>(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new Error(`User with ID "${id}" not found`)
    }

    done(null, omit(user, ['password']))
  } catch (error) {
    done(error, false)
  }
})

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } })

      if (!user) {
        throw new Error(`User '${username}' not found`)
      }

      const isPasswordCorrect = await comparePasswords(password, user.password)

      if (!isPasswordCorrect) {
        throw new Error('Wrong password')
      }

      done(null, omit(user, ['password']))
    } catch (error) {
      done(error, false)
    }
  }),
)
