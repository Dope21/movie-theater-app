import User from './schemas/user'

const findOne = (query, fields = {}, options = {}) => User.findOne(query, fields, options).lean()

export default {
  findOne,
}
