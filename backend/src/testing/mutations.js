const { gql } = require('graphql-request')

const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const SIGN_UP = gql`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

module.exports = {
  LOGIN,
  SIGN_UP
}
