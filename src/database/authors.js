/* eslint-disable require-jsdoc */
const AuthorsModel = require('./author-model')

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
