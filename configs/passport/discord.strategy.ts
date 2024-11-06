// @ts-nocheck: passport and passport-discord-auth typescript conflicts

// @deno-types="@types/passport"
import passport from 'passport'

import { pick } from '@std/collections/pick'
import DiscordUserModel from 'configs/mongoose/DiscordUser.model.ts'
import env from 'libs/env.ts'
import { Scope, Strategy as DiscordStrategy } from 'passport-discord-auth'
import { DiscordUser } from 'types'

const PROPS_TO_BE_KEPT = ['id', 'username', 'global_name'] as const

passport.serializeUser<DiscordUser['id']>((user: DiscordUser, done) => {
  done(null, user.id)
})

passport.deserializeUser<DiscordUser['id']>(async (id, done) => {
  try {
    const discordUser = await DiscordUserModel.findById(id)

    if (!discordUser) {
      return done(null, null)
    }

    done(null, pick(discordUser, PROPS_TO_BE_KEPT))
  } catch (error) {
    done(error, false)
  }
})

export default passport.use(
  new DiscordStrategy({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    callbackUrl: env.DISCORD_REDIRECT_URL,
    scope: [Scope.Identify],
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const discordUser = await DiscordUserModel.findOne({ id: profile.id })

      if (!discordUser) {
        const newDiscordUser = new DiscordUserModel(
          pick(profile, PROPS_TO_BE_KEPT),
        )

        const savedDiscordUser = await newDiscordUser.save()

        return done(
          null,
          pick(savedDiscordUser, PROPS_TO_BE_KEPT),
        )
      }

      done(null, pick(discordUser, PROPS_TO_BE_KEPT))
    } catch (error) {
      done(error, false)
    }
  }),
)
