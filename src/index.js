const express = require('express')
const app = express()
const router = require('./routes')
const performanceMiddleware = require('./middlewares/performance')

app.use(performanceMiddleware)
app.use('/articles', router.articlesRouter)
app.all('*', (req, res) => {
  res.status(404).send('Not found')
  return
})

app.listen(8080, () => {
  console.log('Running on port 8080')
})
