import { gql } from 'apollo-server-express'
import { merge } from 'lodash'

import cinema from './cinema'

const moduleTypeDefs = [
  cinema.typeDefs,
]

const moduleQueries = [
  cinema.queries,
]

const moduleMutations = [
  cinema.mutations,
]

const typeDefs = gql`

  ${moduleTypeDefs.join('\n')}

  type Query {
    ${moduleQueries.join('\n')}
  }

  type Mutation {
    ${moduleMutations.join('\n')}
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = merge(
  cinema.resolver,
)

export {
  typeDefs,
  resolvers,
}
