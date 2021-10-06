const articleModel = require('../database/articles')

const deleteArticle = async (id) => {
  try {
    const deletedArticle = await articleModel.delete(id)
    if (deletedArticle === null) return false
    else return true
  } catch (err) {
    return console.log(err)
  }
}
module.exports = deleteArticle
