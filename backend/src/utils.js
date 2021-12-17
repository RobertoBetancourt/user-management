const { verify } = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

function getUserId (context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET)
    return verifiedToken?.userId
  }
}

module.exports = {
  getUserId,
  APP_SECRET
}
