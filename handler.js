const url = require('url')

const serverHandler = async (data) => {
  return (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)

    const queryString = url.parse(req.url, true).query

    switch (true) {
      case req.url === '/articles':
        res.statusCode = 200
        res.write(data)
        break

      case typeof queryString.id === 'string':
        const found = JSON.parse(data).find((e) => e.id === queryString.id)

        if (found === undefined) {
          res.statusCode = 404
          res.write(`${res.statusCode} not found`)
          res.end()
        } else {
          res.statusCode = 200
          res.write(JSON.stringify(found))
          res.end()
        }
        break

      default:
        res.statusCode = 400
        res.write(`${res.statusCode} Invalid URL`)
    }
    res.end()
  }
}

module.exports = serverHandler
