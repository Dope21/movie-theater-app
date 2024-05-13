import mongoose from 'mongoose'

const ticketSeatSchema = new mongoose.Schema({
  seatType: { type: String, required: true },
  postion: { type: String, required: true },
})

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'users' },
  showAt: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'movieshowtimes' },
  seats: { type: [ticketSeatSchema], required: true },
  totalSeat: { type: Number, required: true },
  totalPrices: { type: Number, required: true },
})

const TicketModel = mongoose.model('tickets', ticketSchema)

export default TicketModel
