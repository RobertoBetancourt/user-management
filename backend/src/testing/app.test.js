// Asserting and testing tools
const { afterEach, beforeAll, beforeEach, describe, test } = require('@jest/globals')
const { assert, expect } = require('chai')
// Client
const { createGraphQLClient } = require('./client')
// Mutations
const { LOGIN, SIGN_UP } = require('./mutations')
// Prisma Client
const { PrismaClient } = require('@prisma/client')
// Queries
const { GET_ALL_USERS } = require('./queries')
// Utils
const { clearData } = require('./test.utils')

describe('Test application', () => {
  const prisma = new PrismaClient()

  beforeAll(async () => {
    await clearData(prisma)
  })

  afterEach(async () => {
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
    beforeEach(async () => {
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

  describe('Test getting all users', () => {
    let token = null
    beforeAll(async () => {
      const client = createGraphQLClient()
      const variablesArray = [
        {
          email: 'jane@mail.com',
          name: 'Jane',
          password: '12341234'
        },
        {
          email: 'john@mail.com',
          name: 'John',
          password: '24682468'
        }
      ]

      for (let i = 0; i < variablesArray.length; i++) {
        ({ signUp: { token } } = await client.request(SIGN_UP, { data: variablesArray[i] }))
      }
    })

    test('Test successful getting all users', async () => {
      const client = createGraphQLClient(token)
      const { getAllUsers: users } = await client.request(GET_ALL_USERS)

      expect(users).to.have.lengthOf(2)
      expect(users[0]).to.have.property('id')
      expect(users[1]).to.have.property('id')
      expect(users[0]).to.have.property('name')
      expect(users[1]).to.have.property('name')
    })

    test('Test failed getting all users', async () => {
      const client = createGraphQLClient()
      try {
        await client.request(GET_ALL_USERS)
      } catch (e) {
        const errorMessage = e.response.errors[0].message
        assert.strictEqual(errorMessage, 'No estás autorizado para realizar esta acción.')
      }
    })
  })
})
