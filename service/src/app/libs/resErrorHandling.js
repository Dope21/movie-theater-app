import 'express-async-errors'
import ERROR_RESPONSE from '../constants/errorResponse'

class ResponseError extends Error {
  constructor({
    httpStatus,
    serviceCode,
    description,
    error,
    payload,
  }) {
    super(description)
    this.httpStatus = httpStatus || 500
    this.serviceCode = serviceCode
    this.description = error?.message || description
    this.payload = payload
  }
}

export const errorMiddleware = (err, req, res, _next) => res.status(err.httpStatus).json(err)

export const catchResponse = (error) => {
  const errorData = error.serviceCode ? error : { ...ERROR_RESPONSE.INTERNAL_SERVER_ERROR, error }
  throw new ResponseError(errorData)
}
