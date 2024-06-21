import { Flex } from 'antd'
import { SelectedSeat } from '@/stores/showtimes_slice'
import Regular from '@/icons/regular.svg'
import Honeymoon from '@/icons/honeymoon.svg'
import Emperor from '@/icons/emperor.svg'

interface SeatGroupProps {
  name: string
  seatList: SelectedSeat[]
}

const seatMap = {
  Regular: Regular,
  Honeymoon: Honeymoon,
  Emperor: Emperor
}

const SeatGroup: React.FC<SeatGroupProps> = ({ name, seatList }) => {

  const SeatIcon = seatMap[name as keyof typeof seatMap]
  const seatListString = seatList.map((seat) => seat.position).join(', ')
  const totalPrices = seatList.reduce((acc, seat) => acc + seat.price, 0).toLocaleString()

  return (
    <Flex align='center' gap={16}>
      <SeatIcon style={{ width: 50, height: 50 }} />
      <Flex align='end' justify='space-between' style={{ width: '100%' }}>
        <Flex vertical>
          <span>{name}</span>
          <span>{seatListString}</span>
        </Flex>
        <div>{totalPrices} THB</div>
      </Flex>
    </Flex>
  )
}

export default SeatGroup