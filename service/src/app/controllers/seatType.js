import seatTypeModel from '../models/seatType'
import { catchResponse } from '../libs/resErrorHandling'

const getAllSeatType = async (req, res) => {
  try {
    const seatTypes = await seatTypeModel.find({})
    return res.status(200).json(seatTypes)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getAllSeatType,
}
