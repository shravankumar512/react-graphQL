const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

//graphQL stuff
const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')

// server port
const port = 3000


// create apollo-express server
function createServer() {
    return new ApolloServer({
        typeDefs,
        resolvers
    })
}

async function init() {

    try {
        
        // use container name to connect with database
        await mongoose.connect('mongodb://mongodb/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('MongoDB Connected')

        // start the server
        const server = createServer()
        await server.listen({ port })
        console.log('server started at 3000')

    } catch (err) {
        console.log(err)
    }
}

init()