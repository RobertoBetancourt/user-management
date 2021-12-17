const { gql } = require('graphql-request')

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
    }
  }
`

module.exports = {
  GET_ALL_USERS
}
