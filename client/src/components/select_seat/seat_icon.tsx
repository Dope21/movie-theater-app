import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores'
import Check from '@/icons/check.svg'
import Regular from '@/icons/regular.svg'
import Honeymoon from '@/icons/honeymoon.svg'
import Emperor from '@/icons/emperor.svg'
import { Seat } from '@/components/select_seat/types'
import { setSelectedSeat, removeSelectedSeat } from '@/stores/showtimes_slice'

interface SeatIconProps {
  seat: Seat
}

const seatMap = {
  Regular: Regular,
  Honeymoon: Honeymoon,
  Emperor: Emperor
}

const SeatIcon: React.FC<SeatIconProps> = ({ seat }) => {

  const dispatch = useDispatch<AppDispatch>()
  const SeatToDisplay = seatMap[seat.name as keyof typeof seatMap]
  const [isSelect, setIsSelect] = useState<boolean>(false)

  const toggleSelect = () => {
    if (isSelect) dispatch(removeSelectedSeat(seat)) 
    else dispatch(setSelectedSeat(seat))
    setIsSelect(!isSelect)
  }

  return (
    <div onClick={toggleSelect} style={{ cursor: 'pointer' }}>
      {isSelect 
        ? <Check style={{ width: 25, height: 25, color: 'green' }} /> 
        : <SeatToDisplay style={{ width: 35, height: 35 }} />
      }
    </div>
  )
}

export default SeatIcon