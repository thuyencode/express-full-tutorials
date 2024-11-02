import { Schema } from 'express-validator'
import { emptyErrorMessage, notStringErrorMessage } from './utils.ts'

export const createUserValidationSchema: Schema = {
  username: {
    isString: {
      errorMessage: notStringErrorMessage('username'),
    },
    notEmpty: {
      errorMessage: emptyErrorMessage('username'),
    },
  },
  name: {
    isString: {
      errorMessage: notStringErrorMessage('name'),
    },
    notEmpty: {
      errorMessage: emptyErrorMessage('name'),
    },
  },
}
