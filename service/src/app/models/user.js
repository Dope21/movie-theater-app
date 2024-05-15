import mongoose from 'mongoose'

import userSchema from './schemas/user'

const model = mongoose.model('users', userSchema)

const findOne = (query, fields = {}, options = {}) => model.findOne(query, fields, options).lean()

export default {
  findOne,
}
