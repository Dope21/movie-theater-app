import mongoose from 'mongoose'

const movieShowTimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'movies' },
  theater: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'theaters' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, {
  versionKey: false,
  timestamps: true,
})

export default movieShowTimeSchema
