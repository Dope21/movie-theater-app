import mongoose from 'mongoose'

const ticketSeatSchema = new mongoose.Schema({
  seatType: { type: String, required: true },
  position: { type: String, required: true },
})

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'users' },
  showAt: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'movieshowtimes' },
  seats: { type: [ticketSeatSchema], required: true },
  totalSeats: { type: Number, required: true },
  totalPrices: { type: Number, required: true },
}, {
  versionKey: false,
  timestamps: true,
})

export default ticketSchema
