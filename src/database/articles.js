/* eslint-disable require-jsdoc */
const ArticleModel = require('./article-model')

class Article {
  create(article) {
    const model = new ArticleModel(article)
    return model.save()
  }
  list() {
    return ArticleModel.find().exec()
  }
  get(id) {
    return ArticleModel.findById(id).exec()
  }
  update(id, article) {
    return ArticleModel.findByIdAndUpdate(id, article).exec()
  }
  delete(id) {
    return ArticleModel.findByIdAndDelete(id).exec()
  }
  deleteByAuthorName(authorName) {
    return ArticleModel.deleteMany({author: authorName}).exec()
  }
}
module.exports = new Article()
