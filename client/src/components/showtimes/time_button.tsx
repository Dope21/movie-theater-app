import { useDispatch } from 'react-redux'
import { Button, Space } from 'antd'
import { StartTime } from '@/app/movie/[id]/showtimes/types'
import { AppDispatch } from '@/stores'
import { setSelectedShowtime } from '@/stores/showtimes_slice'

interface TimeButtonProps {
  time: string
  onClick: () => void
}

interface TimeButtonListProps {
  startTimes: [StartTime]
  theaterId: string
}

const TimeButton: React.FC<TimeButtonProps> = ({ time, onClick }) => {

  return(
    <Button onClick={onClick}>
      {time}
    </Button>
  ) 
}

const TimeButtonList: React.FC<TimeButtonListProps> = ({ startTimes, theaterId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleChangeStep = (theaterId: string, showtimeId: string) => {
    dispatch(setSelectedShowtime({ theaterId, showtimeId }))
  }

  return (
    <Space>
      {startTimes.map((time, key) => (
        <TimeButton 
          key={time.showTimeId + key} 
          time={time.time} 
          onClick={() => handleChangeStep(theaterId, time.showTimeId)} 
        />
      ))}
    </Space>
  )
}

export default TimeButtonList