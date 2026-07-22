
import { Context } from './Context'


class IsportsError extends Error {

  isIsportsError = true

  sdk = 'Isports'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IsportsError
}

