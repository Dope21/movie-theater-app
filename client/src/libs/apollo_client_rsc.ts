// import { HttpLink } from '@apollo/client'
// import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support/'
// import configs from '@/configs'

// export const { getClient } = registerApolloClient(() => {
//   const httpLink = new HttpLink({
//     uri: `${configs.API_GATEWAY_URL}/graphql`,
//   })

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: httpLink,
//   })
// })
import { HttpLink } from '@apollo/client'
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import configs from '@/configs'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${configs.API_GATEWAY_URL}/graphql`,
    }),
  })
})