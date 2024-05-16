import theaterModel from '../models/theater'
import { catchResponse } from '../libs/resErrorHandling'
import ERROR_RESPONSE from '../constants/errorResponse'

const getTheaterById = async (req, res) => {
  try {
    const { id } = req.params
    const theater = await theaterModel.findTheaterWithSeatTypeById(id)
    if (!theater) throw ERROR_RESPONSE.GET_THEATER_BY_ID_NOT_FOUND
    return res.status(200).json(theater)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getTheaterById,
}
