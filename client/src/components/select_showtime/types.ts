import { gql } from '@apollo/client'

interface StartTime {
  time: string
  showTimeId: string
}

interface Theater {
  theaterId: string
  theaterNumber: number
  theaterType: string
  startTimes: [StartTime]
}

interface GetShowDatesByMovieIdResponse {
  getShowDatesByMovieId: {
    data: {
      showDateList: [string]
      initialTheaterList: [Theater]
    }
  }
}

interface GetShowTimesInAllTheatersResponse {
  getShowTimesInAllTheaters: {
    data: [Theater]
  }
}

const GET_SHOW_DATES_BY_MOVIE_ID = gql`
  query GetShowDatesByMovieId($id: String) {
    getShowDatesByMovieId(id: $id) {
      data {
        showDateList
        initialTheaterList {
          theaterId
          theaterNumber
          theaterType
          startTimes {
            time
            showTimeId
          }
        }
      }
    }
  }
`

const GET_SHOWTIMES_IN_ALL_THEATERS = gql`
  query GetShowTimesInAllTheaters($movieId: String, $date: String) {
    getShowTimesInAllTheaters(movieId: $movieId, date: $date) {
      data {
        theaterId
        theaterNumber
        theaterType
        startTimes {
          time
          showTimeId
        }
      }
    }
  }
`

export {
  GET_SHOW_DATES_BY_MOVIE_ID,
  GET_SHOWTIMES_IN_ALL_THEATERS
}

export type {
  Theater,
  StartTime,
  GetShowDatesByMovieIdResponse,
  GetShowTimesInAllTheatersResponse
}