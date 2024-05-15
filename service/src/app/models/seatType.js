import mongoose from 'mongoose'

import seatTypeSchema from './schemas/seatType'

const model = mongoose.model('seattypes', seatTypeSchema)

const find = (query, options = {}, fields = {}) => model.find(query, options, fields)

export default {
  find,
}
