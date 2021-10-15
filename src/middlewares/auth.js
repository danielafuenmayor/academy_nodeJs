const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    res.status(401).send('Not authorized')
    return
  }
  try {
    jwt.verify(token.split(' ')[1], `${process.env.JWT_SECRET_KEY}`)
  } catch (err) {
    res.status(401).send('Not authorized')
  }
  next()
}
module.exports = authMiddleware
