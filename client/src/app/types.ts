import { gql } from '@apollo/client'

interface GetAllMoviesPageResponse {
  getAllMovies: {
    data: [{
      _id: string
      title: string
      image: string
      startDate: string
    }]
  }
}

const GET_ALL_MOVIES_PAGE = gql`
  query GetAllMovies {
    getAllMovies {
      data {
        _id
        title
        image
        startDate
      }
    }
  }
`

export {
  GET_ALL_MOVIES_PAGE
}

export type {
  GetAllMoviesPageResponse
}