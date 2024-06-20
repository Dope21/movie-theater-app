import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSuspenseQuery } from '@apollo/client'
import { Flex } from 'antd'
import { RootState } from '@/stores'
import { GET_THEATER_SEATS, GetTheaterSeatsResponse, GroupedSeats } from '@/components/select_seat/types'
import SeatList from '@/components/select_seat/seat_list'
import SelectDetail from '@/components/select_seat/select_detail'

interface SelectSeatProps {
  movieId: string
}

const SelectSeat: React.FC<SelectSeatProps> = ({ movieId }) => {
  const [groupedSeats, setGroupedSeats] = useState<GroupedSeats>({})
  const [bookedPosition, setBookedPosition] = useState(new Set<string>())
  const { theaterId, showtimeId } = useSelector((state: RootState) => state.showtimes.selectedShowtime)
  const theaterData = useSuspenseQuery<GetTheaterSeatsResponse>(GET_THEATER_SEATS, { variables: { theaterId, showtimeId }})

  useEffect(() =>{
    const data = theaterData.data.getTheaterSeats.data
    const bookedSet = new Set(data.bookedSeat)
    const groupedSeats = data.theater.seats.reduce((acc: GroupedSeats, seat) => {
      const key = seat.position[0]
      if (!acc[key]) { acc[key] = [] }
      acc[key].push(seat)
      return acc
    }, {})

    setBookedPosition(bookedSet)
    setGroupedSeats(groupedSeats)
  }, [])

  return (
    <Flex align='start' justify='space-between'>
      <SeatList groupedSeats={groupedSeats} bookedPosition={bookedPosition} />      
      <SelectDetail />
    </Flex>
  )
}

export default SelectSeat