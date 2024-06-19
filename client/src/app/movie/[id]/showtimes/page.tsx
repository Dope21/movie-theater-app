'use client'

import useShowtimes from '@/hooks/showtimes_hook'
import OrderSteps from '@/components/showtimes/order_steps'
import DateList from '@/components/showtimes/date_list'
import TheaterList from '@/components/showtimes/theater_list'

interface ShowTimeProps {
  params: { id: string }
}

const ShowTime: React.FC<ShowTimeProps> = ({ params }) => {

  const { datesData, theaterData, fetchNewTheaterListByDate } = useShowtimes(params.id)

  const theaterList = 
    theaterData?.data?.getShowTimesInAllTheaters.data ||
    datesData.data.getShowDatesByMovieId.data.initialTheaterList
  
  return(
    <>
      <OrderSteps />
      <DateList 
        fetchTheater={fetchNewTheaterListByDate} 
        itemList={datesData.data.getShowDatesByMovieId.data.showDateList} 
      />
      <TheaterList itemList={theaterList} />
    </>
  )
}

export default ShowTime