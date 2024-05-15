import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  type: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'seattypes' },
  position: { type: String, required: true },
})

const TheaterTypeEnum = {
  TWOD: '2D',
  THREED: '3D',
  FOURD: '4D',
  IMAX: 'IMAX',
}

const theaterSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  type: { type: String, enum: Object.values(TheaterTypeEnum), required: true },
  seats: { type: [seatSchema], required: true },
}, {
  versionKey: false,
  timestamps: true,
})

export default theaterSchema
