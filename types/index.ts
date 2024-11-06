import { Profile } from 'passport-discord-auth'

export type WithoutNullableKeys<T> = {
  [K in keyof T]-?: WithoutNullableKeys<NonNullable<T[K]>>
}

export interface User {
  id: string
  username: string
  name?: string
  password: string
}

export interface ReqQuery {
  filter?: keyof User
  value?: string
}

export type ReqBody = Partial<Omit<User, 'id'>>

export interface ReqParams {
  id: string
}

export type Field = keyof (ReqQuery & ReqBody)

export interface CartItem extends Pick<User, 'name'> {
  price?: number
}

export type ExpressUser = Omit<User, 'password'>

export type DiscordUser = Pick<Profile, 'id' | 'username' | 'global_name'>
