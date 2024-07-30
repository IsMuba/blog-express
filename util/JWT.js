const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config.db')

const JWT = {
  generate(value, expires) {
    return jwt.sign(value, SECRET, { expiresIn: expires })
  },
  verify(token) {
    try {
      return jwt.verify(token, SECRET)
    } catch (error) {
      console.log('JWT ERROR: ', error)
      return false
    }
  }
}

module.exports = JWT
