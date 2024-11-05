import { MOCKED_USERS } from 'libs/constants.ts'

export type WithoutNullableKeys<T> = {
  [K in keyof T]-?: WithoutNullableKeys<NonNullable<T[K]>>
}

export type User = typeof MOCKED_USERS[number]

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
