const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

const Mutation = {
  signUp: async (_parent, args, context) => {
    const { name, email, password } = args.data
    const hashedPassword = await hash(password, 10)

    const registeredEmail = await context.prisma.user.findUnique({ where: { email } })
    if (registeredEmail) {
      throw new Error('El email ya se encuentra registrado.')
    }

    const user = await context.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    }
  },
  login: async (_parent, args, context) => {
    const { email, password } = args.data

    const user = await context.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('No se encontró el email. Intenta nuevamente')
    }

    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('La contraseña no es correcta. Intenta nuevamente.')
    }

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    }
  },
  updateUser: async (_parent, args, context) => {
    const { id, name, oldPassword, newPassword } = args.data

    let hashedNewPassword = null
    if (oldPassword) {
      const user = await context.prisma.user.findUnique({ where: { id } })
      const passwordValid = await compare(oldPassword, user.password)
      if (!passwordValid) {
        throw new Error('La contraseña actual no es correcta. Intenta nuevamente.')
      }

      hashedNewPassword = await hash(newPassword, 10)
    }

    const updatedUser = await context.prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        ...(hashedNewPassword && { password: hashedNewPassword })
      }
    })

    return updatedUser
  },
  deleteUser: async (_parent, args, context) => {
    const { id } = args.data

    const user = await context.prisma.user.update({
      where: { id },
      data: { active: false }
    })

    return user
  }
}

module.exports = {
  Mutation
}
