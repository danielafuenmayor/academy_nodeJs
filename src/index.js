const express = require('express')
const app = express()
const router = require('./routes')
const performanceMiddleware = require('./middlewares/performance')
const authMiddleware = require('./middlewares/auth')
require('./database')
require('dotenv').config()

app.use(express.json())
app.use(performanceMiddleware)
app.use('/auth', router.authRouter)
// app.use(authMiddleware)
app.use('/articles', router.articlesRouter)
app.use('/authors', router.authorsRouter)

app.all('*', (req, res) => {
  res.status(404).send('Not found')
  return
})

app.listen(8080, () => {
  console.log('Running on port 8080')
})
