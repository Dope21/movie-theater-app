import theaterController from '../../src/app/controllers/theater'
import theaterModel from '../../src/app/models/theater'
import ERROR_RESPONSE from '../../src/app/constants/errorResponse'

describe('[Unit] Theater Controller', () => {
  let req
  let res
  const mockFindTheaterWithSeatTypeById = jest.fn()
  const mockCatchResponse = jest.fn()

  describe('getTheaterById', () => {
    beforeEach(() => {
      req = { params: { id: 1234 } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      theaterModel.findTheaterWithSeatTypeById = mockFindTheaterWithSeatTypeById
      theaterController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      theaterController.__ResetDependency__('catchResponse')
    })

    it('should return theater if found', async () => {
      const mockTheater = [{ _id: 1234, number: '1' }]

      mockFindTheaterWithSeatTypeById.mockResolvedValueOnce(mockTheater)

      await theaterController.getTheaterById(req, res)

      expect(mockFindTheaterWithSeatTypeById).toHaveBeenCalledTimes(1)
      expect(mockFindTheaterWithSeatTypeById).toHaveBeenCalledWith(req.params.id)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockTheater)
    })

    it('should return error if theater not found', async () => {
      mockFindTheaterWithSeatTypeById.mockResolvedValueOnce([])

      await theaterController.getTheaterById(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(ERROR_RESPONSE.GET_THEATER_BY_ID_NOT_FOUND)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFindTheaterWithSeatTypeById.mockRejectedValueOnce(error)

      await theaterController.getTheaterById(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
