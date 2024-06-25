import Cross from '@/icons/cross.svg'
import { Space, Flex } from 'antd'
import { GroupedSeats } from '@/components/select_seat/types'
import SeatIcon from './seat_icon'

interface SeatListProps {
  groupedSeats: GroupedSeats
  bookedPosition: Set<string>
}

const SeatList: React.FC<SeatListProps> = ({ groupedSeats, bookedPosition }) => {

  return (
    <div>
      {Object.entries(groupedSeats).map(([key, seats]) => (
        <Flex key={key} align='center' style={{ marginBottom: '1rem' }}>
          <div style={{ marginRight: '1rem' }}>{key}</div>
          <Space>
            {seats.map((seat, index) => (
              <Flex key={seat.position + index} vertical align='center'>
                <Flex align='center' justify='center' style={{ width: 50, height: 50}}>
                  { 
                    bookedPosition.has(seat.position) 
                    ? <Cross style={{ width: 25, height: 25, color: 'red' }} /> 
                    : <SeatIcon seat={seat} />
                  }
                </Flex>
                <span>{seat.position}</span>
              </Flex>
            ))}
          </Space>
        </Flex>
      ))}
    </div>
  )
}

export default SeatList