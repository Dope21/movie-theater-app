
import { Steps } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores'

const items = [
  { title: 'Select Showtime' },
  { title: 'Select Seat' },
  { title: 'Buy Seat' },
]

const OrderSteps = () => {
  const { orderStep } = useSelector((state: RootState) => state.showtimes)

  return (
    <Steps current={orderStep} items={items} style={{ margin: '2rem 0 2rem 0' }} />
  )
}

export default OrderSteps