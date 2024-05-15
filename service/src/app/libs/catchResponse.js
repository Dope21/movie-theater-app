import 'express-async-errors'
import ERROR_RESPONSE from '../constants/errorResponse'

class ResponseError extends Error {
  constructor({
    httpStatus,
    serviceCode,
    message,
    error,
  }) {
    super(message)
    this.httpStatus = httpStatus || 500
    this.serviceCode = serviceCode
    this.message = error?.message || message
  }
}

const catchResponse = ({
  httpStatus, serviceCode, message, error,
}) => {
  const errorData = serviceCode ? { httpStatus, serviceCode, message } : { ...ERROR_RESPONSE.INTERNAL_SERVER_ERROR, error }
  throw new ResponseError(errorData)
}

export default catchResponse
