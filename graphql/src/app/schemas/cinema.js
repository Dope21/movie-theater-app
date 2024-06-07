import cinemaController from '../controllers/cinema'

const typeDefs = `

  type User {
    _id: String
    username: String
    email: String
    phone: String
    createdAt: String
    updatedAt: String
  }

  type Movie {
    _id: String
    title: String
    image: String
    duration: Int
    preview: String
    tags: [String]
    startDate: String
    createdAt: String
    updatedAt: String
  }

  type Seat {
    position: String
    name: String
    price: Int
  }

  type Theater {
    number: Int
    type: String
    seats: [Seat]
  }

  type StartTimes {
    time: String
    showTimeId: String
  }

  type TheaterShowTimeList {
    theaterId: String
    theaterNumber: Int
    theaterType: String
    startTimes: [StartTimes]
  }

  type ShowDateList {
    showDateList: [String]
    initialTheaterList: [TheaterShowTimeList]
  }

  type TheaterSeats {
    theater: Theater
    bookedSeat: [String]
  }

  type UserPayload {
    data: User
  }

  type MovieListPayload {
    data: [Movie]
  }

  type MoviePayload {
    data: Movie
  }

  type ShowDateListPayload {
    data: ShowDateList
  }

  type ShowTimesInAllTheatersPayload {
    data: [TheaterShowTimeList]
  }

  type TheaterSeatsPayload {
    data: TheaterSeats
  }

  type MessagePayload {
    message: String
  }

  type CreateOrderPayload {
    data: MessagePayload
  }

  input TicketSeat {
    seatType: String
    position: String
  }

  input CreateOrderInputs {
    userId: String
    showAt: String
    seats: [TicketSeat]
    totalSeats: Int
    totalPrices: Float
  }
`
const queries = `
  getUserById(id: String): UserPayload
  getAllMovies: MovieListPayload
  getMovieById(id: String): MoviePayload
  getShowDatesByMovieId(id: String): ShowDateListPayload
  getShowTimesInAllTheaters(movieId: String, date: String): ShowTimesInAllTheatersPayload
  getTheaterSeats(theaterId: String, showTimeId: String): TheaterSeatsPayload
`
const mutations = `
  createOrder(order: CreateOrderInputs): CreateOrderPayload
`
const resolver = {
  Query: {
    getUserById: (_, args) => cinemaController.getUserById(args.id),
    getAllMovies: () => cinemaController.getAllMovies(),
    getMovieById: (_, args) => cinemaController.getMovieById(args.id),
    getShowDatesByMovieId: (_, args) => cinemaController.getShowDatesByMovieId(args.id),
    getShowTimesInAllTheaters: (_, args) => cinemaController.getShowTimesInAllTheaters(args.movieId, args.date),
    getTheaterSeats: (_, args) => cinemaController.getTheaterSeats(args.theaterId, args.showTimeId),
  },
  Mutation: {
    createOrder: (_, args) => cinemaController.createOrder(args.order),
  },
}

export default {
  typeDefs,
  queries,
  mutations,
  resolver,
}
