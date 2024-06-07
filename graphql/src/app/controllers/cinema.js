import cinemaService from '../services/cinema'

const getUserById = async (id) => {
  try {
    const response = await cinemaService.getUserById(id)
    return response
  } catch (error) {
    return error.message
  }
}

const getAllMovies = async () => {
  try {
    const response = await cinemaService.getAllMovies()
    return response
  } catch (error) {
    return error.message
  }
}

const getMovieById = async (id) => {
  try {
    const response = await cinemaService.getMovieById(id)
    return response
  } catch (error) {
    return error.message
  }
}

const getShowDatesByMovieId = async (id) => {
  try {
    const responseDates = await cinemaService.getShowDatesByMovieId(id)
    const showDateList = responseDates.data

    const responseTheaters = await cinemaService.getShowTimesInAllTheaters(id, showDateList[0])
    const initialTheaterList = responseTheaters.data

    return { data: { showDateList, initialTheaterList } }
  } catch (error) {
    return error.message
  }
}

const getShowTimesInAllTheaters = async (movieId, date) => {
  try {
    const response = await cinemaService.getShowTimesInAllTheaters(movieId, date)
    return response
  } catch (error) {
    return error.message
  }
}

const getTheaterSeats = async (theaterId, showTimeId) => {
  try {
    const responseTheater = await cinemaService.getTheaterById(theaterId)
    const responseBookedSeat = await cinemaService.getBookedSeatByShowTimeId(showTimeId)

    const theater = responseTheater.data
    const bookedSeat = responseBookedSeat.data

    return { data: { theater, bookedSeat } }
  } catch (error) {
    return error.message
  }
}

const createOrder = async () => async (order) => {
  try {
    const response = await cinemaService.createOrder(order)
    return response.data
  } catch (error) {
    return error.message
  }
}

export default {
  getUserById,
  getAllMovies,
  getMovieById,
  getShowDatesByMovieId,
  getShowTimesInAllTheaters,
  getTheaterSeats,
  createOrder,
}
