import supertest from 'supertest'

import app from '../../src/app'
import ticketModel from '../../src/app/models/ticket'
import ERROR_REPONSE from '../../src/app/constants/errorResponse'

const { URL_PREFIX } = process.env

const request = supertest(app)

describe('[Integration] Ticket Controller', () => {
  let mockBody
  let mockBookedSeats

  describe('[Function] Create Order', () => {
    mockBody = {
      userId: '664317f046073d14c4c6b1ae',
      showAt: '6643265af406b1963a91eaa9',
      seats: [
        {
          seatType: 'Regular',
          position: 'B1',
          _id: '664423f7a502929a3c844a7e',
        },
        {
          seatType: 'Regular',
          position: 'B2',
          _id: '664423f7a502929a3c844a7f',
        },
      ],
      totalSeats: 2,
      totalPrices: 440,
    }

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should return status 201 if create success', async () => {
      mockBookedSeats = [{ bookedSeats: [] }]
      jest.spyOn(ticketModel, 'create').mockResolvedValueOnce(true)
      jest.spyOn(ticketModel, 'findBookedSeatsByShowTimeId').mockResolvedValueOnce(mockBookedSeats)
      const response = await request.post(`${URL_PREFIX}/tickets`).send(mockBody)

      expect(response.status).toEqual(201)
      expect(response.body).toMatchObject({ message: 'create sucessfuly' })
    })

    it('should return status 400 if seat already booked', async () => {
      mockBookedSeats = [{ bookedSeats: ['B2'] }]
      jest.spyOn(ticketModel, 'findBookedSeatsByShowTimeId').mockResolvedValueOnce(mockBookedSeats)
      const response = await request.post(`${URL_PREFIX}/tickets`).send(mockBody)

      expect(response.status).toEqual(400)
      expect(response.body).toMatchObject(ERROR_REPONSE.CREATE_ORDER_DUPLICATE_SEAT)
    })

    it('should return status 500 if promise reject', async () => {
      const mockError = 'erorr'
      jest.spyOn(ticketModel, 'findBookedSeatsByShowTimeId').mockRejectedValueOnce(mockError)
      const response = await request.post(`${URL_PREFIX}/tickets`).send(mockBody)

      expect(response.status).toEqual(500)
    })
  })

  describe('[Function] Get Booked Seat by Show Time ID', () => {
    const mockShowTimeId = '6643265af406b1963a91eaa9'

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return status 200', async () => {
      mockBookedSeats = [{ bookedSeats: ['B2'] }]
      jest.spyOn(ticketModel, 'findBookedSeatsByShowTimeId').mockResolvedValueOnce(mockBookedSeats)
      const response = await request.get(`${URL_PREFIX}/tickets/booked/${mockShowTimeId}`)

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(mockBookedSeats)
    })

    it('should return status 500 if promise reject', async () => {
      const mockError = 'erorr'
      jest.spyOn(ticketModel, 'findBookedSeatsByShowTimeId').mockRejectedValueOnce(mockError)
      const response = await request.get(`${URL_PREFIX}/tickets/booked/${mockShowTimeId}`)

      expect(response.status).toEqual(500)
    })
  })
})
