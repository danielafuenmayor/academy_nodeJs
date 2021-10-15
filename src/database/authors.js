/* eslint-disable require-jsdoc */
const mongoose = require('mongoose')
const {Schema} = mongoose

const AuthorsModelSchema = new Schema({
  name: String,
  articles: [String],
})
const AuthorsModel = mongoose.model('AuthorsModel', AuthorsModelSchema)

class Authors {
  create(author) {
    const model = new AuthorsModel(author)
    return model.save()
  }
  list() {
    return AuthorsModel.find().exec()
  }
  get(id) {
    return AuthorsModel.findById(id).exec()
  }
  getByName(name) {
    return AuthorsModel.find({name: name}).exec()
  }
  getByArticleId(articleId) {
    return AuthorsModel.find({articles: articleId}).exec()
  }
  update(id, author) {
    return AuthorsModel.findByIdAndUpdate(id, author).exec()
  }
  delete(id) {
    return AuthorsModel.findByIdAndDelete(id).exec()
  }
}
module.exports = new Authors()
