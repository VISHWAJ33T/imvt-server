const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');
require('dotenv').config()
async function startServer() {
    const app = express()
    const server = new ApolloServer({ typeDefs, resolvers });

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    // Add the GraphQL middleware to our Express stack by mounting it onto the /graphql path
    app.use('/graphql', expressMiddleware(server))

    app.listen(8000, () => { console.log("server started at port 8000"); })
}

startServer()