import { Steps, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/stores'
import { setPreviousStep } from '@/stores/showtimes_slice'

const items = [
  { title: 'Select Showtime' },
  { title: 'Select Seat' },
  { title: 'Buy Seat' },
]

const OrderSteps = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { orderStep } = useSelector((state: RootState) => state.showtimes)
  const handleOnClick = () => dispatch(setPreviousStep())

  return (
    <div style={{ margin: '2rem 0 2rem 0' }}>
      <Steps current={orderStep} items={items} style={{ marginBottom: '1rem' }} />
      <Button type='link' icon={<LeftOutlined />} onClick={handleOnClick}>Back</Button>
    </div>
  )
}

export default OrderSteps