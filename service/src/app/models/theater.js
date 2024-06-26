import mongoose from 'mongoose'

import stringToObjectId from '../libs/stringToObjectId'

import theaterSchema from './schemas/theater'

const model = mongoose.model('theaters', theaterSchema)

const findTheaterWithSeatTypeById = async (id) => {
  const [theater] = await model.aggregate([
    { $match: { _id: stringToObjectId(id) } },
    { $unwind: '$seats' },
    {
      $lookup: {
        from: 'seattypes',
        localField: 'seats.type',
        foreignField: '_id',
        as: 'seatTypeInfo',
      },
    },
    { $unwind: '$seatTypeInfo' },
    {
      $group: {
        _id: '$_id',
        number: { $first: '$number' },
        type: { $first: '$type' },
        seats: {
          $push: {
            position: '$seats.position',
            name: '$seatTypeInfo.name',
            price: '$seatTypeInfo.price',
          },
        },
      },
    },
  ])

  return theater
}

export default {
  findTheaterWithSeatTypeById,
}
