import mongoose from 'mongoose'

import movieSchema from './schemas/movie'

const model = mongoose.model('movies', movieSchema)

const find = (query, fields = {}, options = {}) => model.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => model.findOne(query, fields, options).lean()

export default {
  find,
  findOne,
}
