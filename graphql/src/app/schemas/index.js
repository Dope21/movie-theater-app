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

  ${moduleQueries.join('\n')}

  ${moduleMutations.join('\n')}
`

const resolver = merge(
  cinema.resolver,
)

export {
  typeDefs,
  resolver,
}
