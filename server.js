const http = require('http')
const reader = require('./dataReader')
const handler = require('./handler')

const serverListener = async (req, res) => {
  try {
    const data = await reader('./src/db.json')
    const serverHandler = await handler(data)
    const server = http.createServer(serverHandler)
    server.listen(8080, () => console.log('Running'))
  } catch (err) {
    console.log(err)
  }
}
serverListener()
