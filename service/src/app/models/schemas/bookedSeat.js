import mongoose from 'mongoose'

const bookedSeatSchema = mongoose.Schema({
  showTimeId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'MovieShowTime' },
  seatPosition: { type: String, required: true },
})

const BookedSeatModel = mongoose.model('BookedSeat', bookedSeatSchema)

export default BookedSeatModel
