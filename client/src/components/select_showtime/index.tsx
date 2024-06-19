import useShowtimes from '@/hooks/showtimes_hook'
import DateList from '@/components/select_showtime/date_list'
import TheaterList from '@/components/select_showtime/theater_list'

const SelectShowtime: React.FC<{ movieId: string }> = ({ movieId }) => {
  const { datesData, theaterData, fetchNewTheaterListByDate } = useShowtimes(movieId)

  const theaterList = 
    theaterData?.data?.getShowTimesInAllTheaters.data ||
    datesData.data.getShowDatesByMovieId.data.initialTheaterList

  return (
    <>
      <DateList 
        fetchTheater={fetchNewTheaterListByDate} 
        itemList={datesData.data.getShowDatesByMovieId.data.showDateList} 
      />
      <TheaterList itemList={theaterList} />
    </>
  )
}

export default SelectShowtime