import { Router } from 'express'

import controllers from '../controllers'

const router = Router()

router
  .get('/users/:id', controllers.user.getById)
  .get('/movies', controllers.movie.getAll)
  .get('/movies/:id', controllers.movie.getById)
  .get('/movies/:movieId/showtime/dates', controllers.movieShowTime.getShowDatesByMovieId)
  .get('/movies/:movieId/showtime/:date/theaters', controllers.movieShowTime.getShowTimesInAllTheater)
  .get('/theaters/:id', controllers.theater.getTheaterById)
  .get('/seat/types', controllers.seatType.getAllSeatType)
  .get('/tickets/booked/:showTimeId', controllers.ticket.getBookedSeatsByShowTimeId)
  .post('/tickets', controllers.ticket.createOrder)

export default router
