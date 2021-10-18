/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const validate = require('../utils/authorValidator')

class Service {
  constructor(articleModel, authorModel) {
    this.articleModel = articleModel
    this.authorModel = authorModel
  }
  async list() {
    const articles = await this.authorModel.list()
    return articles
  }

  async get(id) {
    const found = await this.authorModel.get(id)

    if (found === null) {
      throw new Error('Not found')
    }
    return found
  }

  async getById(id) {
    const found = await this.authorModel.get(id)
    return found
  }

  async create(req) {
    const newAuthor = {
      ...req.body,
    }

    const isAuthorValid = await validate(newAuthor)
    if (isAuthorValid !== true) {
      throw new Error(isAuthorValid)
    }
    return await this.authorModel.create(newAuthor)
  }

  async update(req) {
    const {id} = req.params
    const found = await this.authorModel.get(id)

    if (found === null) {
      throw new Error('Not found')
    }
    const editedAuthor = {
      ...req.body,
    }

    return await this.authorModel.update(id, editedAuthor)
  }

  async delete(req) {
    const {id} = req.params

    const author = await this.authorModel.get(id)

    if (author === null) {
      throw new Error('Not found')
    }
    await this.articleModel.deleteByAuthorName(author.name)
    return await this.authorModel.delete(id)
  }
}

module.exports = Service
