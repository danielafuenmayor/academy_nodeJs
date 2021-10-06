const moment = require('moment')
const articleModel = require('../database/articles')

const editArticle = async (id, req) => {
  const editedArticle = {
    ...req.body,
    modifiedAt: moment().format('MM/DD/YYYY'),
  }
  try {
    await articleModel.update(id, editedArticle)
    return true
  } catch (err) {
    return false
  }
}

module.exports = editArticle
