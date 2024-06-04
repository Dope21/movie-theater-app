import supertest from 'supertest'

import app from '../../src/app'
import movieModel from '../../src/app/models/movie'
import ERROR_REPONSE from '../../src/app/constants/errorResponse'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] Movie Controller', () => {
  let mockResponseBody

  describe('[Function] Get All', () => {
    mockResponseBody = [{ _id: 1, title: 'movie-title' }]

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return status 200', async () => {
      jest.spyOn(movieModel, 'find').mockResolvedValueOnce(mockResponseBody)
      const response = await request.get(`${URL_PREFIX}/movies`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockResponseBody)
    })
  })

  describe('[Function] Get By ID', () => {
    const mockMovie = {
      _id: '664319647c12bbe4e3a3ce58',
      title: 'Inception',
      image: 'inception.jpg',
      duration: 148,
      preview: 'inception_preview.mp4',
      description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
      tags: ['Action'],
      startDate: new Date('2010-07-16').toISOString(),
    }

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return movie', async () => {
      jest.spyOn(movieModel, 'findOne').mockResolvedValueOnce(mockMovie)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovie._id}`)

      expect(response.status).toEqual(200)
      expect(response.body).toMatchObject(mockMovie)
    })

    it('should return status 404 if movie not found', async () => {
      jest.spyOn(movieModel, 'findOne').mockResolvedValueOnce(null)
      const response = await request.get(`${URL_PREFIX}/movies/${mockMovie._id}`)

      expect(response.status).toEqual(404)
      expect(response.body).toMatchObject(ERROR_REPONSE.GET_MOVIE_BY_ID_NOT_FOUND)
    })

    it('should return status 500 if id is not valid', async () => {
      const notValidId = 'id not valid'
      const response = await request.get(`${URL_PREFIX}/movies/${notValidId}`)

      expect(response.status).toEqual(500)
    })
  })
})
