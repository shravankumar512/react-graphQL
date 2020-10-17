const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')

const port = 3000;

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`
const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port }).then(() => {
    console.log('server started at 3000...')
})