import { useEffect } from 'react'
import { useSuspenseQuery, useLazyQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores'
import { setSelectedMovie, resetShowtime } from '@/stores/showtimes_slice'
import { GET_MOVIE_BY_ID, GetMovieByIdResponse } from '@/app/movie/[id]/types'
import { 
  GetShowDatesByMovieIdResponse, 
  GetShowTimesInAllTheatersResponse,
  GET_SHOWTIMES_IN_ALL_THEATERS,
  GET_SHOW_DATES_BY_MOVIE_ID
} from '@/components/select_showtime/types'


const useShowtimes = (movieId: string) => {

  const dispatch = useDispatch<AppDispatch>()
  dispatch(resetShowtime())

  const movieData = useSuspenseQuery<GetMovieByIdResponse>(GET_MOVIE_BY_ID, { variables: { id: movieId }})
  useEffect(() => {
    const movie = movieData.data.getMovieById.data
    const selectedMovie = { 
      id: movieId, 
      title: movie.title, 
      duration: movie.duration, 
      image: movie.image 
    }
    dispatch(setSelectedMovie(selectedMovie))
  }, [movieData])

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