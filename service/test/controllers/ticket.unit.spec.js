import ticketController from '../../src/app/controllers/ticket'
import ticketModel from '../../src/app/models/ticket'
import ERROR_RESPONSE from '../../src/app/constants/errorResponse'

describe('[Unit] Ticket Controller', () => {
  let req
  let res
  const mockCreate = jest.fn()
  const mockFindBookedSeatsByShowTimeId = jest.fn()
  const mockCatchResponse = jest.fn()

  describe('createOrder', () => {
    beforeEach(() => {
      req = {
        body: {
          userId: 1234,
          showAt: 5678,
          seats: [{ seatType: 'regular', position: 'B1' }],
          totalSeats: 1,
          totalPrices: 220,
        },
      }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      ticketModel.create = mockCreate
      ticketModel.findBookedSeatsByShowTimeId = mockFindBookedSeatsByShowTimeId
      ticketController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      ticketController.__ResetDependency__('catchResponse')
    })

    it('should return status 201 if create sucess', async () => {
      const message = { message: 'create sucessfuly' }
      const emptyBookedSeat = [{}]

      mockFindBookedSeatsByShowTimeId.mockResolvedValueOnce(emptyBookedSeat)
      mockCreate.mockResolvedValueOnce(true)

      await ticketController.createOrder(req, res)

      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledTimes(1)
      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledWith(req.body.showAt)
      expect(mockCreate).toHaveBeenCalledTimes(1)
      expect(mockCreate).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(message)
    })

    it('should return error if seat already booked', async () => {
      const error = ERROR_RESPONSE.CREATE_ORDER_DUPLICATE_SEAT
      const bookedSeats = [{ bookedSeats: ['B1'] }]

      mockFindBookedSeatsByShowTimeId.mockResolvedValueOnce(bookedSeats)

      await ticketController.createOrder(req, res)

      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledTimes(1)
      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledWith(req.body.showAt)
      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFindBookedSeatsByShowTimeId.mockRejectedValueOnce(error)

      await ticketController.createOrder(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })

  describe('getBookedSeatByShowTimeId', () => {
    beforeEach(() => {
      req = { params: { showTimeId: 1234 } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      ticketModel.findBookedSeatsByShowTimeId = mockFindBookedSeatsByShowTimeId
      ticketController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      ticketController.__ResetDependency__('catchResponse')
    })

    it('should return list of booked seats', async () => {
      const mockBookedSeat = ['booked seats']

      mockFindBookedSeatsByShowTimeId.mockResolvedValueOnce(mockBookedSeat)

      await ticketController.getBookedSeatsByShowTimeId(req, res)

      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledTimes(1)
      expect(mockFindBookedSeatsByShowTimeId).toHaveBeenCalledWith(req.params.showTimeId)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockBookedSeat)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFindBookedSeatsByShowTimeId.mockRejectedValueOnce(error)

      await ticketController.getBookedSeatsByShowTimeId(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
