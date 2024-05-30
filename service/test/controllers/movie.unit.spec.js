import movieController from '../../src/app/controllers/movie'
import movieModel from '../../src/app/models/movie'
import ERROR_RESPONSE from '../../src/app/constants/errorResponse'

describe('[Unit] Movie Controller', () => {
  let req
  let res
  const mockFind = jest.fn()
  const mockFindOne = jest.fn()
  const mockCatchResponse = jest.fn()

  describe('getAll', () => {
    beforeEach(() => {
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      movieModel.find = mockFind
      movieController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      movieController.__ResetDependency__('catchResponse')
    })

    it('should return all movies', async () => {
      const mockMovieList = ['movie list']

      mockFind.mockResolvedValueOnce(mockMovieList)

      await movieController.getAll(req, res)

      expect(mockFind).toHaveBeenCalledTimes(1)
      expect(mockFind).toHaveBeenCalledWith({})
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockMovieList)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFind.mockRejectedValueOnce(error)

      await movieController.getAll(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })

  describe('getById', () => {
    beforeEach(() => {
      req = { params: { id: 1234 } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      movieModel.findOne = mockFindOne
      movieController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      movieController.__ResetDependency__('catchResponse')
    })

    it('should return movie if found', async () => {
      const mockMovie = { _id: 1234, title: 'movie' }
      const params = { _id: req.params.id }

      mockFindOne.mockResolvedValueOnce(mockMovie)

      await movieController.getById(req, res)

      expect(mockFindOne).toHaveBeenCalledTimes(1)
      expect(mockFindOne).toHaveBeenCalledWith(params)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockMovie)
    })

    it('should return error if movie not found', async () => {
      const params = { _id: req.params.id }

      mockFindOne.mockResolvedValueOnce(null)

      await movieController.getById(req, res)

      expect(mockFindOne).toHaveBeenCalledTimes(1)
      expect(mockFindOne).toHaveBeenCalledWith(params)
      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(ERROR_RESPONSE.GET_MOVIE_BY_ID_NOT_FOUND)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFindOne.mockRejectedValueOnce(error)

      await movieController.getById(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
