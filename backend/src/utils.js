const { verify } = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

function getUserId (context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    let verifiedToken = null
    try {
      verifiedToken = verify(token, APP_SECRET)
    } catch (error) {
      console.log(error)
    }
    return verifiedToken?.userId
  }
}

module.exports = {
  getUserId,
  APP_SECRET
}
