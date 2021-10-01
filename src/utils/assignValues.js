const assignNewValues = (req, found) => {
  const {title, url, keywords, author, readMins, source} = req.body
  if (title) found.title = title
  if (url) found.url = url
  if (keywords) found.keywords = keywords
  if (author) found.author = author
  if (readMins) found.readMins = readMins
  if (source) found.source = source
}

module.exports = assignNewValues
