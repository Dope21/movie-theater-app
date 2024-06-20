import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSuspenseQuery } from '@apollo/client'
import { RootState } from '@/stores'
import { GET_THEATER_SEATS, GetTheaterSeatsResponse, GroupedSeats } from '@/components/select_seat/types'

const useSelectSeat = () => {
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

  return { groupedSeats, bookedPosition }
}

export default useSelectSeat