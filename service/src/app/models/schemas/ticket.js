import mongoose from 'mongoose'

const ticketSeatSchema = mongoose.Schema({
  seatType: { type: String, required: true },
  postion: { type: String, required: true },
})

const ticketSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
  showAt: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'MovieShowTime' },
  seats: { type: [ticketSeatSchema], required: true },
  totalSeat: { type: Number, required: true },
  totalPrices: { type: Number, required: true },
})

const TicketModel = mongoose.model('Ticket', ticketSchema)

export default TicketModel
