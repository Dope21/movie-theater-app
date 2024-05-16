export default {
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    serviceCode: 'INTERNAL_SERVER_ERROR',
  },
  GET_USER_BY_ID_NOT_FOUND: {
    httpStatus: 404,
    serviceCode: 'GET_USER_BY_ID_NOT_FOUND',
    description: 'User Not Found.',
  },
  GET_MOVIE_BY_ID_NOT_FOUND: {
    httpStatus: 404,
    serverCode: 'GET_USER_BY_ID_NOT_FOUND',
    description: 'Movie Not Found.',
  },
  GET_THEATER_BY_ID_NOT_FOUND: {
    httpStatus: 404,
    serverCode: 'GET_THEATER_BY_ID_NOT_FOUND',
    description: 'Theater Not Found.',
  },
  CREATE_ORDER_DUPLICATE_SEAT: {
    httpStatus: 400,
    serverCode: 'CREATE_ORDER_DUPLICATE_SEAT',
    description: 'Seat Not Avaiable',
  },
}
