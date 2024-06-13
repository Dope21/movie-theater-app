'use client'

import { HttpLink, ApolloLink } from '@apollo/client'
import { ApolloClient, InMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support'
import configs from '@/configs'

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: `${configs.API_GATEWAY_URL}/graphql`,
    fetchOptions: { cache: 'no-store' }
  })

  const link = typeof window === 'undefined' 
    ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink ]) : httpLink

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    link,
  })
}

export {
  makeClient,
}