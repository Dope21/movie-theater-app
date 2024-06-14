import { Divider, Flex } from 'antd'
import { getClient } from '@/libs/apollo_client_rsc'
import { GET_ALL_MOVIES_PAGE, GetAllMoviesPageResponse } from './types'
import MovieCard from '@/components/movie_card'

const Home = async () => {
  const client = getClient()
  const { data } = await client.query<GetAllMoviesPageResponse>({ query: GET_ALL_MOVIES_PAGE })
  return(
    <>
      <Divider orientation="left">MOVIES</Divider>
      <Flex wrap gap="large">
        {data.getAllMovies.data.map((movie, index) => (
          <MovieCard 
            key={movie._id + index} 
            _id={movie._id} 
            title={movie.title} 
            date={movie.startDate} 
            src={movie.image}
          />
        ))}
      </Flex>
    </>
  )
}

export default Home