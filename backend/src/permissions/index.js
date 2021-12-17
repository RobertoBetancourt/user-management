const { rule, and, shield } = require('graphql-shield')
const { getUserId } = require('../utils')

const throwAuthorizationError = () => {
  throw new Error('No estás autorizado para realizar esta acción')
}

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context) => {
    const verifiedToken = getUserId(context)

    if (!verifiedToken) {
      throwAuthorizationError()
    }
    return true
  }),
  isSpecificUser: rule()(async (_parent, args, context) => {
    const { id: inputId } = args.data
    const userId = getUserId(context)

    if (inputId !== userId) {
      throwAuthorizationError()
    }
    return true
  })
}

const permissions = shield({
  Query: {
    getUser: rules.isSpecificUser,
    getAllUsers: rules.isAuthenticatedUser
  },
  Mutation: {
    updateUser: rules.isSpecificUser,
    deleteUser: rules.isSpecificUser
  }
}, { debug: true })

module.exports = {
  permissions
}
