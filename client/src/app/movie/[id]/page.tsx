import { Flex } from 'antd'
import { GET_MOVIE_BY_ID, GetMovieByIdResponse } from './types'
import MovieCardWithDetail from '@/components/movie_card_with_detail'
import MoviePreviewPlayer from '@/components/movie_preview_player'
import { getClient } from '@/libs/apollo_client_rsc'

interface MovieDeatilProps {
  params: { id: string }
}

const MovieDetail = async ({ params }: MovieDeatilProps) => {
  const client = getClient()
  const { data } = await client.query<GetMovieByIdResponse>({query: GET_MOVIE_BY_ID,  variables: { id: params.id } })
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