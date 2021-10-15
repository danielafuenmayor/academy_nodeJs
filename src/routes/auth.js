const {Router} = require('express')
const authRouter = new Router()
const service = require('../service/auth')

authRouter.post('/login', async (req, res) => {
  const {user, password} = req.body
  try {
    const token = await service.login(user, password)
    res.status(200).json(token)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
module.exports = authRouter
