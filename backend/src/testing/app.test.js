// Asserting and testing tools
const { beforeAll, afterAll, describe, test } = require('@jest/globals')
const { assert } = require('chai')
// Client
const { createGraphQLClient } = require('./client')
// Mutations
const { LOGIN, SIGN_UP } = require('./mutations')
// Prisma Client
const { PrismaClient } = require('@prisma/client')
// Utils
const { clearData } = require('./testUtils')

describe('Test application', () => {
  const prisma = new PrismaClient()

  beforeAll(async () => {
    await clearData(prisma)
  })

  afterAll(async () => {
    await clearData(prisma)
  })

  describe('Test sign up', () => {
    let client = null
    beforeAll(async () => {
      client = createGraphQLClient()
    })

    test('Test successful sign up', async () => {
      const variables = {
        data: {
          email: 'alice@mail.com',
          name: 'Alice',
          password: '12341234'
        }
      }

      const { signUp: { user } } = await client.request(SIGN_UP, variables)

      assert.strictEqual(user.name, 'Alice')
      assert.strictEqual(user.email, 'alice@mail.com')
    })

    test('Test failed sign up', async () => {
      const variables = {
        data: {
          email: 'alice@mail.com',
          name: 'Alice',
          password: '12341234'
        }
      }

      try {
        await client.request(SIGN_UP, variables)
      } catch (e) {
        const errorMessage = e.response.errors[0].message
        assert.strictEqual(errorMessage, 'El email ya se encuentra registrado.')
      }
    })
  })

  describe('Test login', () => {
    let client = null
    beforeAll(async () => {
      client = createGraphQLClient()

      const variables = {
        data: {
          email: 'john@mail.com',
          password: '12341234',
          name: 'John'
        }
      }

      await client.request(SIGN_UP, variables)
    })

    test('Test successful login', async () => {
      const variables = {
        data: {
          email: 'john@mail.com',
          password: '12341234'
        }
      }

      const { login: { user } } = await client.request(LOGIN, variables)

      assert.strictEqual(user.name, 'John')
      assert.strictEqual(user.email, 'john@mail.com')
    })

    test('Test failed login', async () => {
      const variables = {
        data: {
          email: 'john@mail.com',
          password: '98769876'
        }
      }

      try {
        await client.request(LOGIN, variables)
      } catch (e) {
        const errorMessage = e.response.errors[0].message
        assert.strictEqual(errorMessage, 'La contraseña no es correcta. Intenta nuevamente.')
      }
    })
  })
})
