const validate = require('./validator')
const moment = require('moment')
const articleModel = require('../database/articles')

const createNewArticle = async (req) => {
  const newArticle = {
    ...req.body,
    publishedAt: moment().format('MM/DD/YYYY'),
    modifiedAt: moment().format('MM/DD/YYYY'),
  }
  try {
    const isArticleValid = await validate(newArticle)
    if (isArticleValid === true) {
      await articleModel.create(newArticle)
      return true
    }
    return isArticleValid
  } catch (err) {
    return console.log(err)
  }
}
module.exports = createNewArticle
