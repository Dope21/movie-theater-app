import stringToObjectId from '../libs/stringToObjectId'

import Theater from './schemas/theater'

const findTheaterWithSeatTypeById = (id) => Theater.aggregate([
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

export default {
  findTheaterWithSeatTypeById,
}
