import executeValidator from './executeValidator'
import createOrderRequest from './createOrder'

export default {
  createOrder: executeValidator(createOrderRequest),
}
