import SeatType from './schemas/seatType'

const find = (query, options = {}, fields = {}) => SeatType.find(query, options, fields)

export default {
  find,
}
