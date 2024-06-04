import supertest from 'supertest'

import app from '../../src/app'
import theaterModel from '../../src/app/models/theater'
import ERROR_REPONSE from '../../src/app/constants/errorResponse'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] Theater Controller', () => {
  describe('[Funtion] Get Theater By ID', () => {
    const mockTheaterId = '664319647c12bbe4e3a3ce58'
    const mockResponseBody = [{ _id: 1, theaterNumber: 1 }]

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return theater', async () => {
      jest.spyOn(theaterModel, 'findTheaterWithSeatTypeById').mockResolvedValueOnce(mockResponseBody)
      const response = await request.get(`${URL_PREFIX}/theaters/${mockTheaterId}`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockResponseBody)
    })

    it('should return 404 if theater not found', async () => {
      jest.spyOn(theaterModel, 'findTheaterWithSeatTypeById').mockResolvedValueOnce([])
      const response = await request.get(`${URL_PREFIX}/theaters/${mockTheaterId}`)

      expect(response.status).toEqual(404)
      expect(response.body).toMatchObject(ERROR_REPONSE.GET_THEATER_BY_ID_NOT_FOUND)
    })

    it('should return 500 if promise reject', async () => {
      const mockError = 'error'
      jest.spyOn(theaterModel, 'findTheaterWithSeatTypeById').mockRejectedValueOnce(mockError)
      const response = await request.get(`${URL_PREFIX}/theaters/${mockTheaterId}`)

      expect(response.status).toEqual(500)
    })
  })
})
