import mongoose from 'mongoose'

import stringToObjectId from '../libs/stringToObjectId'

import ticketSchema from './schemas/ticket'

const model = mongoose.model('tickets', ticketSchema)

const create = (data, options) => model.create(data, options)

const findBookedSeatsByShowTimeId = async (showTimeId) => {
  const [data] = await model.aggregate([
    { $match: { showAt: stringToObjectId(showTimeId) } },
    { $unwind: '$seats' },
    {
      $group: {
        _id: '$showAt',
        bookedSeats: { $push: '$seats.position' },
      },
    },
    {
      $project: {
        _id: 0,
        bookedSeats: 1,
      },
    },
  ])

  return data ? data.bookedSeats : []
}

export default {
  create,
  findBookedSeatsByShowTimeId,
}
