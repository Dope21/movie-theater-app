import { validationResult } from 'express-validator'

import { catchResponse } from '../libs/resErrorHandling'

const errorFormat = ({
  location, msg, param, value,
}) => ({
  value,
  msg: `${param} ${msg}`,
  param,
  location,
})

const executeValidator = (requestValidator) => async (req, res, next) => {
  await Promise.all(requestValidator.map((validate) => validate(req, res, () => {})))
  const errors = validationResult(req).formatWith(errorFormat)
  if (errors.isEmpty()) return next()

  return catchResponse({
    httpStatus: 422,
    serviceCode: 'UNPROCESSABLE_ENTITY',
    payload: errors.array({ onlyFirstError: true }),
  })
}

export default executeValidator
