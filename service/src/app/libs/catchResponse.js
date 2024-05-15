import ERROR_RESPONSE from '../constants/errorResponse'

require('express-async-errors')

class ResponseError extends Error {
  constructor({
    httpStatus,
    serviceCode,
    description,
    error,
  }) {
    super(description)
    this.httpStatus = httpStatus || 500
    this.serviceCode = serviceCode
    this.description = error?.message || description
  }
}

const catchResponse = (error) => {
  const errorData = error.serviceCode ? error : { ...ERROR_RESPONSE.INTERNAL_SERVER_ERROR, error }
  throw new ResponseError(errorData)
}

export default catchResponse
