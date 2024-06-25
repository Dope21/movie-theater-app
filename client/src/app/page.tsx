'use client'

import { useSuspenseQuery } from '@apollo/client'
import { Divider, Flex } from 'antd'
import { GET_ALL_MOVIES_PAGE, GetAllMoviesPageResponse } from './types'
import MovieCard from '@/components/movie_card'

const Home = () => {
  const { data } = useSuspenseQuery<GetAllMoviesPageResponse>(GET_ALL_MOVIES_PAGE, { fetchPolicy: 'cache-and-network' })
  return(
    <>
      <Divider orientation="left">MOVIES</Divider>
      <Flex wrap gap="large">
        {data.getAllMovies.data && data.getAllMovies.data.map((movie, index) => (
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