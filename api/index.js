const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//graphQL stuff
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');


// server port
const port = 5000;

// create apollo-express server
function createServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });
}

async function init() {

    try {
        console.log('...starting server...');
        // use container name to connect with database
        await mongoose.connect('mongodb://mongodb/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');

        // start the server
        const server = createServer();
        await server.listen({ port });
        console.log('server started at ', port);

    } catch (err) {
        console.log(err);
    }
}

init();