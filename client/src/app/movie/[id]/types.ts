import { gql } from '@apollo/client'

interface GetMovieByIdResponse {
  getMovieById: {
    data: {
      title: string
      description: string
      image: string
      duration: number
      preview: string
      tags: [string]
      startDate: string
    }
  }
}

const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: String!) {
    getMovieById(id: $id) {
      data {
        title
        description
        image
        duration
        preview
        tags
        startDate
      }
    }
  }
`

export {
  GET_MOVIE_BY_ID
}

export type {
  GetMovieByIdResponse
}