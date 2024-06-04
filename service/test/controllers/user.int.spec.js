import supertest from 'supertest'

import app from '../../src/app'
import userModel from '../../src/app/models/user'
import ERROR_REPONSE from '../../src/app/constants/errorResponse'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] User Controller', () => {
  describe('[Function] Get By ID', () => {
    const mockUser = {
      _id: '664319647c12bbe4e3a3ce58',
      username: 'test-user',
      password: 'test-pass',
      email: 'test@gmail.com',
      phone: '999999999',
    }

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return user', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser)
      const response = await request.get(`${URL_PREFIX}/users/${mockUser._id}`)

      expect(response.status).toEqual(200)
      expect(response.body).toMatchObject(mockUser)
    })

    it('should return status 404 if user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null)
      const response = await request.get(`${URL_PREFIX}/users/${mockUser._id}`)

      expect(response.status).toEqual(404)
      expect(response.body).toMatchObject(ERROR_REPONSE.GET_USER_BY_ID_NOT_FOUND)
    })

    it('should return status 500 if id is invalid', async () => {
      const invalidId = 'id not valid'
      const response = await request.get(`${URL_PREFIX}/users/${invalidId}`)

      expect(response.status).toEqual(500)
    })
  })
})
