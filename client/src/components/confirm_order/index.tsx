import { Flex } from 'antd'
import Summary from './summary'
import SeatDetail from './seat_detail'

const ConfirmOrder: React.FC = () => {
  return (
    <Flex justify='space-evenly' align='start' gap={16}>
      <SeatDetail />
      <Summary />
    </Flex>
  )
}

export default ConfirmOrder