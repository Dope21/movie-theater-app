import seatTypeController from '../../src/app/controllers/seatType'
import seatTypeModel from '../../src/app/models/seatType'

describe('[Unit] Seat Type Controller', () => {
  let req
  let res
  const mockFind = jest.fn()
  const mockCatchResponse = jest.fn()

  describe('getAllSeat', () => {
    beforeEach(() => {
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      seatTypeModel.find = mockFind
      seatTypeController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      seatTypeController.__ResetDependency__('catchResponse')
    })

    it('should return all seat types', async () => {
      const mockSeatTypeList = ['seat types']

      mockFind.mockResolvedValueOnce(mockSeatTypeList)

      await seatTypeController.getAllSeatType(req, res)

      expect(mockFind).toHaveBeenCalledTimes(1)
      expect(mockFind).toHaveBeenCalledWith({})
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockSeatTypeList)
    })

    it('should return error if promise reject', async () => {
      const error = 'this is error'

      mockFind.mockRejectedValueOnce(error)

      await seatTypeController.getAllSeatType(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
