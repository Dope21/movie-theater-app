import { gql } from "@apollo/client"

interface GroupedSeats {
  [key: string]: Seat[]
}

interface Seat {
  position: string
  name: string
  price: number
}

interface Theater {
  number: number
  type: string
  seats: [Seat]
}

interface GetTheaterSeatsResponse {
  getTheaterSeats: {
    data: {
      theater: Theater
      bookedSeat: [string]
    }
  }
}

const GET_THEATER_SEATS = gql`
  query GetTheaterSeats($theaterId: String, $showtimeId: String) {
    getTheaterSeats(theaterId: $theaterId, showTimeId: $showtimeId) {
      data {
        bookedSeat
        theater {
          number
          type
          seats {
            position
            name
            price
          }
        }
      }
    }
  }
`

export {
  GET_THEATER_SEATS
}

export type {
  Seat,
  GroupedSeats,
  Theater,
  GetTheaterSeatsResponse
}