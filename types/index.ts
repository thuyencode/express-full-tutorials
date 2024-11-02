import MOCKED_USERS from 'libs/constants.ts'

export type WithoutNullableKeys<T> = {
  [K in keyof T]-?: WithoutNullableKeys<NonNullable<T[K]>>
}

export interface ReqQuery {
  filter?: keyof typeof MOCKED_USERS[number]
  value?: string
}

export interface ReqBody {
  username?: string
  name?: string
}

export interface ReqParams {
  id: string
}

export type Field = keyof (ReqQuery & ReqBody)
