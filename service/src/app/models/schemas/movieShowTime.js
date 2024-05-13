import mongoose from 'mongoose'

const movieShowTimeSchema = mongoose.Schema({
  movieId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Movie' },
  theater: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Theater' },
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
