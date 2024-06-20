import { useDispatch } from 'react-redux'
import { Button, Space } from 'antd'
import { AppDispatch } from '@/stores'
import { confirmShowtime, SelectedShowtime } from '@/stores/showtimes_slice'
import { Theater } from '@/components/select_showtime/types'

interface TimeButtonListProps {
  theater: Theater
}

const TimeButtonList: React.FC<TimeButtonListProps> = ({ theater }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleChangeStep = (selectedShowtime: SelectedShowtime) => {
    dispatch(confirmShowtime(selectedShowtime))
  }

  return (
    <Space>
      {theater.startTimes.map((time, key) => (
        <Button 
          key={time.showTimeId + key} 
          onClick={() => handleChangeStep({
            theaterId: theater.theaterId,
            theaterNumber: theater.theaterNumber,
            showtimeId: time.showTimeId ,
            showtime: time.time
          })} 
        >
          {time.time}
        </Button>
      ))}
    </Space>
  )
}

export default TimeButtonList