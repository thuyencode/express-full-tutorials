import { Field } from './types.ts'

export const emptyErrorMessage = (field: Field) =>
  `'${field}' must not be empty`
export const notStringErrorMessage = (field: Field) =>
  `'${field}' must be a string`
