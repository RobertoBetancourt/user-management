const { GraphQLClient } = require('graphql-request')
const endpoint = 'http://localhost:4000/'

const createGraphQLClient = (token) => {
  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

module.exports = {
  createGraphQLClient
}
