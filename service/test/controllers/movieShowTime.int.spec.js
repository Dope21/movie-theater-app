import supertest from 'supertest'

import app from '../../src/app'
import movieShowTimeModel from '../../src/app/models/movieShowTime'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] Movie Show Time Controller', () => {
  let mockResponseBody
  const mockMovieId = '664319647c12bbe4e3a3ce58'

  describe('[Function] Get Show Dates By Movie ID', () => {
    mockResponseBody = ['yyyy-mm-dd', 'yyyy-mm-dd', 'yyyy-mm-dd', 'yyyy-mm-dd']

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return list of dates by movieId', async () => {
      jest.spyOn(movieShowTimeModel, 'findShowDatesByMovieId').mockResolvedValueOnce(mockResponseBody)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovieId}/showtime/dates`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockResponseBody)
    })

    it('should return error if promise reject', async () => {
      const mockError = 'this is error'
      jest.spyOn(movieShowTimeModel, 'findShowDatesByMovieId').mockRejectedValueOnce(mockError)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovieId}/showtime/dates`)

      expect(response.status).toEqual(500)
    })
  })

  describe('[Function] Get Show Time In All Theater', () => {
    const mockDate = 'yyyy-mm-dd'
    mockResponseBody = [
      {
        theaterId: 1, theaterNumber: 1, theaterType: '2D', startTimes: [],
      },
      {
        theaterId: 2, theaterNumber: 2, theaterType: '2D', startTimes: [],
      },
    ]

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return list of dates by movieId', async () => {
      jest.spyOn(movieShowTimeModel, 'findShowTimeInAllTheaters').mockResolvedValueOnce(mockResponseBody)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovieId}/showtime/${mockDate}/theaters`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockResponseBody)
    })

    it('should return error if promise reject', async () => {
      const mockError = 'this is error'
      jest.spyOn(movieShowTimeModel, 'findShowTimeInAllTheaters').mockRejectedValueOnce(mockError)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovieId}/showtime/${mockDate}/theaters`)

      expect(response.status).toEqual(500)
    })
  })
})
