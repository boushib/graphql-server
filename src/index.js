const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  # User type: the queryable fields for each user in our data source
  type User {
    username: String
    password: String
  }

  # type Query is special
  # lists all available queries that user can execute
  type Query {
    users: [User]!
  }
`
// apollo server can fetch data from any source (database, rest API)
// in our case let's just hardcode the data as follows
const users = [
  {
    username: 'admin',
    password: '123456',
  },
  {
    username: 'user',
    password: 'user123',
  },
]

// we've create a data set
// but apollo server doesn't know that it should
// use that data set
// to fix this let's create a resolver

const resolvers = {
  Query: {
    users: () => users,
  },
}

// Create an instance of ApolloSeerer
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀 Server running at ${url}`)
})
