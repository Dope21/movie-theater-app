import { ApolloServer } from 'apollo-server-express'

import app from './app'
import { SERVER_PORT } from './app/config'
import { typeDefs, resolvers } from './app/schemas'

const port = SERVER_PORT || 3003

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  app.listen(port, () => console.log(`Server is running on port ${port}${apolloServer.graphqlPath}`))
}

app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }))

startApolloServer()
