import { DiscordUser, ExpressUser } from 'types'

declare global {
  namespace Express {
    export interface Request {
      findUserIndex: number
    }

    export interface User extends ExpressUser, DiscordUser {}
  }
}

export {}
