import mongoose from 'mongoose'

const MovieTagEnum = {
  ACTION: 'Action',
  COMEDY: 'Comedy',
  DRAMA: 'Drama',
  HORROR: 'Horror',
  ROMANCE: 'Romance',
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: Number, required: true },
  preview: { type: String, require: true },
  description: { type: String, required: true },
  tags: [{ type: String, enum: Object.values(MovieTagEnum), required: true }],
  startDate: { type: Date, required: true },
}, {
  versionKey: false,
  timestamps: true,
})

export default movieSchema
