import { gql } from '@apollo/client'

const CREATE_NEW_ORDER = gql`
  mutation CreateOrder($order: CreateOrderInputs) {
    createOrder(order: $order) {
      data {
          message
      }
    }
  }
`

export {
  CREATE_NEW_ORDER
}