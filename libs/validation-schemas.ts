import { Schema } from 'express-validator'
import {
  emptyErrorMessage,
  mustBeBetweenErrorMessage,
  notStringErrorMessage,
} from 'libs/utils.ts'

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

const AUTH_USER_IS_LENGTH_OPTIONS = {
  min: 3,
  max: 30.,
}

export const authUserValidationSchema: Schema = {
  username: {
    isString: {
      errorMessage: notStringErrorMessage('username'),
    },
    notEmpty: {
      errorMessage: emptyErrorMessage('username'),
    },
  },
  password: {
    isString: {
      errorMessage: notStringErrorMessage('password'),
    },
    isLength: {
      options: AUTH_USER_IS_LENGTH_OPTIONS,
      errorMessage: mustBeBetweenErrorMessage(
        'password',
        AUTH_USER_IS_LENGTH_OPTIONS,
      ),
    },
  },
}

export const createCartValidationSchema: Schema = {
  name: {
    isString: {
      errorMessage: notStringErrorMessage('name'),
    },
    notEmpty: {
      errorMessage: emptyErrorMessage('name'),
    },
  },
  price: {
    isFloat: {
      options: {
        min: 0,
        max: 100,
      },
      errorMessage: `'price' must be a float number between 0 and 100`,
    },
  },
}
