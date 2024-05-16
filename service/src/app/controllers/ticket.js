import ticketModel from '../models/ticket'
import { catchResponse } from '../libs/resErrorHandling'
import ERROR_RESPONSE from '../constants/errorResponse'

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      showAt,
      seats,
      totalSeats,
      totalPrices,
    } = req.body

    const bookedSeats = await ticketModel.findBookedSeatsByShowTimeId(showAt)
    const bookedSeatsSet = new Set(bookedSeats[0].bookedSeats)
    if (seats.some((seat) => bookedSeatsSet.has(seat.position))) throw ERROR_RESPONSE.CREATE_ORDER_DUPLICATE_SEAT

    await ticketModel.create({
      userId,
      showAt,
      seats,
      totalSeats: +totalSeats,
      totalPrices: +totalPrices,
    })
    return res.status(201).json({ message: 'create sucessfuly' })
  } catch (error) {
    return catchResponse(error)
  }
}

const getBookedSeatsByShowTimeId = async (req, res) => {
  try {
    const { showTimeId } = req.params
    const bookedSeats = await ticketModel.findBookedSeatsByShowTimeId(showTimeId)
    return res.status(200).json(bookedSeats)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  createOrder,
  getBookedSeatsByShowTimeId,
}
