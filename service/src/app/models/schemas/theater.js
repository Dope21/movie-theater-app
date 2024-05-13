import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  type: { type: mongoose.SchemaTypes.ObjectId, ref: 'seatType', required: true },
  position: { type: String, required: true },
})

const TheaterTypeEnum = {
  TWOD: '2D',
  THREED: '3D',
  FOURD: '4D',
  IMAX: 'IMAX',
}

const theaterTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(TheaterTypeEnum),
    required: true,
  },
})

const theaterSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  type: { type: theaterTypeSchema, required: true },
  seat: [seatSchema],
}, {
  versionKey: false,
  timestamps: true,
})

const TheaterModel = mongoose.model('Theater', theaterSchema)

export default TheaterModel
