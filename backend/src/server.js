const express = require('express')
const http = require('http')
const { join } = require('path')
// Apollo Server
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
// GraphQL Tools
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
// Context, resolvers and permissions
const { resolvers } = require('./resolvers')
const { prisma } = require('./context')
const { permissions } = require('./permissions')

async function startApolloServer () {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  // Load schema from .graphql files
  const typeDefs = loadFilesSync(join(__dirname, './graphql'))

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const schemaWithMiddleware = applyMiddleware(schema, permissions)

  // Same ApolloServer initialization as always, plus the drain plugin.
  const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: request => {
      return {
        ...request,
        prisma
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({ app, path: '/' })

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
