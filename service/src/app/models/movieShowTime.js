import mongoose from 'mongoose'

import stringToObjectId from '../libs/stringToObjectId'

import movieShowTimeSchema from './schemas/movieShowTime'

const model = mongoose.model('movieshowtimes', movieShowTimeSchema)

const findShowDatesByMovieId = (movieId) => model.aggregate([
  { $match: { movieId: stringToObjectId(movieId), date: { $gte: new Date() } } },
  {
    $group: {
      _id: '$movieId',
      dates: { $push: new Date('$date') },
    },
  },
])

const findShowTimeInAllTheaters = (movieId, date) => model.aggregate([
  {
    $match: {
      movieId: stringToObjectId(movieId),
      $expr: {
        $eq: [
          { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          date.substring(0, 10),
        ],
      },
    },
  },

  {
    $lookup: {
      from: 'theaters',
      localField: 'theater',
      foreignField: '_id',
      as: 'theaterInfo',
    },
  },
  { $unwind: '$theaterInfo' },
  {
    $group: {
      _id: '$theater',
      theaterNumber: { $first: '$theaterInfo.number' },
      theaterType: { $first: 'theaterInfo.type' },
      startTimes: {
        $push: {
          time: '$startTime',
          showTimeId: '$_id',
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      theaterId: '$_id',
      theaterNumber: 1,
      theaterType: 1,
      startTimes: 1,
    },
  },
])

export default {
  findShowDatesByMovieId,
  findShowTimeInAllTheaters,
}
