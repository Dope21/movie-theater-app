import movieShowTimeModel from '../models/movieShowTime'
import { catchResponse } from '../libs/resErrorHandling'

const getShowDatesByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params
    const { dates } = await movieShowTimeModel.findShowDatesByMovieId(movieId)
    return res.status(200).json(dates || [])
  } catch (error) {
    return catchResponse(error)
  }
}

const getShowTimesInAllTheater = async (req, res) => {
  try {
    const { movieId, date } = req.params
    const theaters = await movieShowTimeModel.findShowTimeInAllTheaters(movieId, date)
    return res.status(200).json(theaters)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getShowDatesByMovieId,
  getShowTimesInAllTheater,
}
