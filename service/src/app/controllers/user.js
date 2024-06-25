import userModel from '../models/user'
import { catchResponse } from '../libs/resErrorHandling'
import ERROR_RESPONSE from '../constants/errorResponse'

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findOne({ _id: id }, { password: 0 })
    if (!user) throw ERROR_RESPONSE.GET_USER_BY_ID_NOT_FOUND
    return res.status(200).json(user)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getById,
}
