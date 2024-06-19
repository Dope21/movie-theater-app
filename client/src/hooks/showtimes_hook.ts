import { useSuspenseQuery, useLazyQuery } from "@apollo/client"
import { 
  GetShowDatesByMovieIdResponse, 
  GetShowTimesInAllTheatersResponse,
  GET_SHOWTIMES_IN_ALL_THEATERS,
  GET_SHOW_DATES_BY_MOVIE_ID
} from "@/app/movie/[id]/showtimes/types"


const useShowtimes = (movieId: string) => {

  const datesData = useSuspenseQuery<GetShowDatesByMovieIdResponse>(GET_SHOW_DATES_BY_MOVIE_ID, { variables: { id: movieId } })
  const [getTheaterListByDate, theaterData] = useLazyQuery<GetShowTimesInAllTheatersResponse>(GET_SHOWTIMES_IN_ALL_THEATERS)
  const fetchNewTheaterListByDate = (date: string) => getTheaterListByDate({ variables: { movieId, date }})

  return {
    datesData,
    theaterData,
    fetchNewTheaterListByDate
  }
}

export default useShowtimes