import supertest from 'supertest'

import app from '../../src/app'
import seatTypeModel from '../../src/app/models/seatType'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] Seat Type Controller', () => {
  describe('[Funtion] Get All Seat Type', () => {
    const mockResponseBody = [{ name: 'Regular', price: 999 }, { name: 'Honeymoon', price: 999 }]

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return status 200', async () => {
      jest.spyOn(seatTypeModel, 'find').mockResolvedValueOnce(mockResponseBody)
      const response = await request.get(`${URL_PREFIX}/seat/types`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockResponseBody)
    })
  })
})
