import stringToObjectId from '../libs/stringToObjectId'

import Ticket from './schemas/ticket'

const create = (data, options) => Ticket.create(data, options)

const findBookedSeatsByShowTimeId = (showTimeId) => Ticket.aggregate([
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

export default {
  create,
  findBookedSeatsByShowTimeId,
}
