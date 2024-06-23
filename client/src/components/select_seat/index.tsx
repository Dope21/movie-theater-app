import { Flex } from 'antd'
import SeatList from '@/components/select_seat/seat_list'
import SelectDetail from '@/components/select_seat/select_detail'
import { useSelectSeat } from '@/hooks'

const SelectSeat: React.FC = () => {

  const { groupedSeats, bookedPosition } = useSelectSeat()

  return (
    <Flex align='start' justify='space-between'>
      <SeatList groupedSeats={groupedSeats} bookedPosition={bookedPosition} />      
      <SelectDetail />
    </Flex>
  )
}

export default SelectSeat