import userController from '../../src/app/controllers/user'
import userModel from '../../src/app/models/user'
import ERROR_RESPONSE from '../../src/app/constants/errorResponse'

describe('[Unit] User Controller', () => {
  describe('getById', () => {
    let req
    let res
    const mockFindOne = jest.fn()
    const mockCatchResponse = jest.fn()

    beforeEach(() => {
      req = { params: { id: '123' } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      userModel.findOne = mockFindOne
      userController.__Rewire__('catchResponse', mockCatchResponse)
    })

    afterEach(() => {
      jest.clearAllMocks()
      userController.__ResetDependency__('catchResponse')
    })

    it('should return user if found', async () => {
      const mockUser = { _id: '123', username: 'jonhwick' }
      const params = { _id: req.params.id }

      mockFindOne.mockResolvedValueOnce(mockUser)

      await userController.getById(req, res)

      expect(mockFindOne).toHaveBeenCalledTimes(1)
      expect(mockFindOne).toHaveBeenCalledWith(params)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith(mockUser)
    })

    it('should return error if not found', async () => {
      const params = { _id: req.params.id }
      mockFindOne.mockResolvedValueOnce(null)

      await userController.getById(req, res)

      expect(mockFindOne).toHaveBeenCalledTimes(1)
      expect(mockFindOne).toHaveBeenCalledWith(params)
      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(ERROR_RESPONSE.GET_USER_BY_ID_NOT_FOUND)
    })

    it('should return error if promise reject', async () => {
      const error = new Error('this is error')

      mockFindOne.mockRejectedValueOnce(error)

      await userController.getById(req, res)

      expect(mockCatchResponse).toHaveBeenCalledTimes(1)
      expect(mockCatchResponse).toHaveBeenCalledWith(error)
    })
  })
})
