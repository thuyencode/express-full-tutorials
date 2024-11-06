import { Field } from 'types'
import bcrypt from '@node-rs/bcrypt'

export const emptyErrorMessage = (field: Field) =>
  `'${field}' must not be empty`

export const notStringErrorMessage = (field: Field) =>
  `'${field}' must be a string`

export const mustBeBetweenErrorMessage = (
  field: Field,
  { min, max }: { min: number; max: number },
) => `'${field}''s value must be in between ${min} and ${max} characters`

export const addMinutes = (date: Date, minutes: number) => {
  const newDate = new Date(date.getTime())

  newDate.setMinutes(newDate.getMinutes() + minutes)

  return newDate
}

const MILLISECONDS_PER_MINUTE = 1000

export const minutesToMilliseconds = (minutes: number) => {
  return MILLISECONDS_PER_MINUTE * minutes * 60
}

const SALT_ROUNDS = 10

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}
