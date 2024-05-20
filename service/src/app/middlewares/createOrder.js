import { body } from 'express-validator'

import MESSAGES from '../constants/validateMessage'

const createOrderRequest = [
  body('userId')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isBase64()
    .withMessage(MESSAGES.isBase64),
  body('showAt')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isBase64()
    .withMessage(MESSAGES.isBase64),
  body('seats')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isArray()
    .withMessage(MESSAGES.isArray),
  body('seats.*.seatType')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isString()
    .withMessage(MESSAGES.isString),
  body('seats.*.position')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isString()
    .withMessage(MESSAGES.isString),
  body('totalSeats')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isInt()
    .withMessage(MESSAGES.isInt),
  body('totalPrices')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .bail()
    .isInt()
    .withMessage(MESSAGES.isInt),
]

export default createOrderRequest
