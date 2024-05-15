import mongoose from 'mongoose'

const seatTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  versionKey: false,
  timeseries: true,
})

export default seatTypeSchema
