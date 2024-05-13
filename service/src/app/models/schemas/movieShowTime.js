import mongoose from 'mongoose'

const movieShowTimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'movies' },
  theater: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'theaters' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  bookedSeat: { type: Set, default: new Set() },
}, {
  versionKey: false,
  timestamps: true,
})

const MovieShowTimeModel = mongoose.model('movieshowtimes', movieShowTimeSchema)

export default MovieShowTimeModel
