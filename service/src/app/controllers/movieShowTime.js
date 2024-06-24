import movieShowTimeModel from '../models/movieShowTime'
import { catchResponse } from '../libs/resErrorHandling'

const getShowDatesByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params
    const { dates } = await movieShowTimeModel.findShowDatesByMovieId(movieId)
    const sortedDates = dates.sort((a, b) => {
      let dateA = new Date(a)
      let dateB = new Date(b)
      if (dateA < dateB) return -1
      if (dateA > dateB) return 1
      return 0
    })
    return res.status(200).json(sortedDates || [])
  } catch (error) {
    return catchResponse(error)
  }
}

const getShowTimesInAllTheater = async (req, res) => {
  try {
    const { movieId, date } = req.params
    const theaters = await movieShowTimeModel.findShowTimeInAllTheaters(movieId, date)
    const sortedTheater = theaters.sort((a, b) => a.theaterNumber - b.theaterNumber)
    return res.status(200).json(sortedTheater)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getShowDatesByMovieId,
  getShowTimesInAllTheater,
}
