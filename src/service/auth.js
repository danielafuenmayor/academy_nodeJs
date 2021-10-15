/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const promisifiedJwt = promisify(jwt.sign)

class AuthService {
  constructor() {
    this.key = `${process.env.JWT_SECRET_KEY}`
  }

  async login(user) {
    try {
      const token = await promisifiedJwt({user}, this.key)
      return token
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = new AuthService()
