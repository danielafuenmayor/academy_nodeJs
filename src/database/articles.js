/* eslint-disable require-jsdoc */
const mongoose = require('mongoose')
const {Schema} = mongoose

const ArticleModelSchema = new Schema({
  id: String,
  title: String,
  url: String,
  keywords: [String],
  modifiedAt: Date,
  publishedAt: Date,
  author: String,
  readMins: Number,
  source: String,
})
const ArticleModel = mongoose.model('ArticleModel', ArticleModelSchema)

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
}
module.exports = new Article()
