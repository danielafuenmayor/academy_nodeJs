const mongoose = require('mongoose')
const {Schema} = mongoose

const AuthorsModelSchema = new Schema({
  name: String,
  articles: [String],
})
const AuthorsModel = mongoose.model('AuthorsModel', AuthorsModelSchema)

module.exports = AuthorsModel
