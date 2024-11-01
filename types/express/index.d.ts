declare global {
  namespace Express {
    export interface Request {
      findUserIndex: number
    }
  }
}

export {}
