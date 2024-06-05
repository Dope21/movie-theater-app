import request from '../libs/request'
import { URL_CINEMA_SERVICE } from '../config'

const getUserById = (id) => request.get(`${URL_CINEMA_SERVICE}/users/${id}`)
const getAllMovies = () => request.get(`${URL_CINEMA_SERVICE}/movies`)
const getMovieById = (id) => request.get(`${URL_CINEMA_SERVICE}/movies/${id}`)
const getShowDatesByMovieId = (id) => request.get(`${URL_CINEMA_SERVICE}/movies/${id}/showtime/dates`)
const getShowTimesInAllTheaters = (movieId, date) => request.get(`${URL_CINEMA_SERVICE}/movies/${movieId}/showtime/${date}/theaters`)
const getTheaterById = (id) => request.get(`${URL_CINEMA_SERVICE}/theaters/${id}`)
const getAllSeatTypes = () => request.get(`${URL_CINEMA_SERVICE}/seat/types`)
const getBookedSeatByShowTimeId = (id) => request.get(`${URL_CINEMA_SERVICE}/tickets/booked/${id}`)
const createOrder = (order) => request.post(`${URL_CINEMA_SERVICE}/tickets/`, order)

export default {
  getUserById,
  getAllMovies,
  getMovieById,
  getShowDatesByMovieId,
  getShowTimesInAllTheaters,
  getTheaterById,
  getAllSeatTypes,
  getBookedSeatByShowTimeId,
  createOrder,
}
