import movieShowTimeController from '../../src/app/controllers/movieShowTime'
import movieShowTimeModel from '../../src/app/models/movieShowTime'

describe('[Unit] Movie Show Time Controller', () => {
  let req
  let res
  const mockFindShowDatesByMovieId = jest.fn()
  const mockFindShowTimeInAllTheater = jest.fn()
  const mockCatchResponse = jest.fn()

  describe('getShowDatesByMovieId', () => {
    beforeEach(() => {
      req = { params: { movieId: 1234 } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      movieShowTimeModel.findShowDatesByMovieId = mockFindShowDatesByMovieId
      movieShowTimeController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      movieShowTimeController.__ResetDependency__('catchResponse')
    })

    it('should return list of show dates', async () => {
      const mockShowTimeList = ['show dates list']

      movieShowTimeModel.findShowDatesByMovieId.mockResolvedValueOnce(mockShowTimeList)

      await movieShowTimeController.getShowDatesByMovieId(req, res)

      expect(mockFindShowDatesByMovieId).toHaveBeenCalledTimes(1)
      expect(mockFindShowDatesByMovieId).toHaveBeenCalledWith(req.params.movieId)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockShowTimeList)
    })

    it('should return error if promise reject', async () => {
      const error = 'this is error'

      movieShowTimeModel.findShowDatesByMovieId.mockRejectedValueOnce(error)

      await movieShowTimeController.getShowDatesByMovieId(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })

  describe('getShowTimeInAllTheater', () => {
    beforeEach(() => {
      req = { params: { movieId: 1234, date: 'yyyy-mm-dd' } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      movieShowTimeModel.findShowTimeInAllTheaters = mockFindShowTimeInAllTheater
      movieShowTimeController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      movieShowTimeController.__ResetDependency__('catchResponse')
    })

    it('should return list of theaters by show time date', async () => {
      const mockTheaterList = ['theater list']

      mockFindShowTimeInAllTheater.mockResolvedValueOnce(mockTheaterList)

      await movieShowTimeController.getShowTimesInAllTheater(req, res)

      expect(mockFindShowTimeInAllTheater).toHaveBeenCalledTimes(1)
      expect(mockFindShowTimeInAllTheater).toHaveBeenCalledWith(req.params.movieId, req.params.date)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockTheaterList)
    })

    it('should return error if promise reject', async () => {
      const error = 'this is error'

      mockFindShowTimeInAllTheater.mockRejectedValueOnce(error)

      await movieShowTimeController.getShowTimesInAllTheater(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
