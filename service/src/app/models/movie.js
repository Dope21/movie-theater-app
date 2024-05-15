import Movie from './schemas/movie'

const find = (query, fields = {}, options = {}) => Movie.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Movie.findOne(query, fields, options).lean()

export default {
  find,
  findOne,
}
