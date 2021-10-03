const validate = require('./validator')
const write = require('./writer')
const moment = require('moment')
const assignNewValues = require('./assignValues')

const editArticle = async (req, articles, found) => {
  const editedArticle = {
    ...found,
    ...req.body,
    modifiedAt: moment().format('MM/DD/YYYY'),
    publishedAt: found.publishedAt,
  }

  try {
    const isArticleValid = await validate(editedArticle)
    if (isArticleValid === true) {
      assignNewValues(req, found)
      await write(articles)
      return true
    }
    return isArticleValid
  } catch (err) {
    return console.log(err)
  }
}

module.exports = editArticle
