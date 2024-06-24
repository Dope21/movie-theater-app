'use client'

import { useSuspenseQuery } from '@apollo/client'
import { Flex } from 'antd'
import { GET_MOVIE_BY_ID, GetMovieByIdResponse } from './types'
import MovieCardWithDetail from '@/components/movie_card_with_detail'
import MoviePreviewPlayer from '@/components/movie_preview_player'

interface MovieDeatilProps {
  params: { id: string }
}

const MovieDetail: React.FC<MovieDeatilProps> = ({ params }) => {
  const { data } = useSuspenseQuery<GetMovieByIdResponse>(GET_MOVIE_BY_ID, { variables: { id: params.id } })
  const movie = data.getMovieById.data

  return (
    <>
      <Flex justify='space-between' align='center'>
        <MovieCardWithDetail
          title={movie.title} 
          startDate={movie.startDate}
          image={movie.image} 
          tags={movie.tags}
          duration={movie.duration}
        />
        <MoviePreviewPlayer url={movie.preview} />
      </Flex>
      <div>
        <h3>Description</h3>
        {movie.description} 
      </div>
    </>
  )
}

export default MovieDetail