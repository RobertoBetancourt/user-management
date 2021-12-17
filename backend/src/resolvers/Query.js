const { getUserId } = require('../utils')

const Query = {
  getBasicUserList: async (_parent, _args, context) => {
    const users = await context.prisma.user.findMany({
      where: {
        active: true
      }
    })
    return users
  },
  getUser: async (_parent, _args, context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findUnique({
      where: {
        id: userId,
        active: true
      }
    })
    return user
  },
  getAllUsers: async (_parent, _args, context) => {
    const users = await context.prisma.user.findMany({
      where: {
        active: true
      }
    })
    return users
  }
}

module.exports = {
  Query
}
