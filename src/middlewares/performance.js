const performanceMiddleware = (req, res, next) => {
  console.time()
  next()
  console.timeEnd()
}

module.exports = performanceMiddleware
