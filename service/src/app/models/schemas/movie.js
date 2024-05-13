import mongoose from 'mongoose'

const MovieTagEnum = {
  ACTION: 'Action',
  COMEDY: 'Comedy',
  DRAMA: 'Drama',
  HORROR: 'Horror',
  ROMANCE: 'Romance',
}

const movieTagSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(MovieTagEnum),
    required: true,
  },
})

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ilmage: { type: String, required: true },
  duration: { type: Number, required: true },
  preview: { type: String, require: true },
  description: { type: String, required: true },
  tags: [{ type: movieTagSchema, required: true }],
  startDate: { type: Date, required: true },
}, {
  versionKey: false,
  timestamps: true,
})

const MovieModel = mongoose.model('Movie', movieSchema)

export default MovieModel
