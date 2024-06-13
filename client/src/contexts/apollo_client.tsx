'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import { makeClient } from '@/libs/apollo_client_ssr'

const ApolloClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}

export default ApolloClientProvider