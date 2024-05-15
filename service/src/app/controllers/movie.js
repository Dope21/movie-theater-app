import movieModel from '../models/movie'
import catchResponse from '../libs/catchResponse'
import ERROR_RESPONSE from '../constants/errorResponse'

const getAll = async (req, res) => {
  try {
    const movies = await movieModel.find({})
    return res.status(200).json(movies)
  } catch (error) {
    return catchResponse(error)
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await movieModel.findOne({ _id: id })
    if (!movie) throw ERROR_RESPONSE.GET_MOVIE_BY_ID_NOT_FOUND
    return res.status(200).json(movie)
  } catch (error) {
    return catchResponse(error)
  }
}

export default {
  getAll,
  getById,
}
