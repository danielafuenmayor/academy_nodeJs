/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const validate = require('../utils/articleValidator')
const moment = require('moment')

class Service {
  constructor(articleModel, authorModel) {
    this.articleModel = articleModel
    this.authorModel = authorModel
  }
  async list() {
    const articles = await this.articleModel.list()
    return articles
  }

  async get(id) {
    const found = await this.articleModel.get(id)

    if (found === null) {
      throw new Error('Not found')
    }
    return found
  }

  async getById(id) {
    const found = await this.articleModel.get(id)
    return found
  }

  async create(req) {
    const {author} = req.body

    const newArticle = {
      ...req.body,
      publishedAt: moment().format('MM/DD/YYYY'),
      modifiedAt: moment().format('MM/DD/YYYY'),
    }

    const isArticleValid = await validate(newArticle)
    if (isArticleValid !== true) {
      throw new Error(isArticleValid)
    }

    const createdArticle = await this.articleModel.create(newArticle)
    const articleAuthor = await this.authorModel.getByName(author)

    if (articleAuthor.length === 0) {
      const newAuthor = {
        name: createdArticle.author,
        articles: [createdArticle._id],
      }
      return await this.authorModel.create(newAuthor)
    }

    const authorsArticles = articleAuthor[0].articles
    authorsArticles.push(createdArticle._id)

    const editedAuthor = {
      _id: author[0]._id,
      articles: authorsArticles,
    }

    await this.authorModel.update(articleAuthor[0]._id, editedAuthor)
  }
  async update(req) {
    const {id} = req.params
    const found = await this.articleModel.get(id)

    if (found === null) {
      throw new Error('Not found')
    }

    const editedArticle = {
      ...req.body,
      modifiedAt: moment().format('MM/DD/YYYY'),
    }
    return await this.articleModel.update(id, editedArticle)
  }

  async delete(id) {
    const article = await this.articleModel.get(id)

    if (article === null) {
      throw new Error('Not found')
    }

    const author = await this.authorModel.getByArticleId(id)

    if (author.length === 0) {
      return await this.articleModel.delete(id)
    }

    const authorArticles = author[0].articles
    const articleIndex = authorArticles.indexOf(article._id)
    authorArticles.splice(articleIndex, 1)

    if (authorArticles.length > 0) {
      const editedAuthor = {
        articles: authorArticles,
      }

      await this.authorModel.update(author[0]._id, editedAuthor)
      return await this.articleModel.delete(id)
    }

    await this.authorModel.delete(author[0]._id)
    return await this.articleModel.delete(id)
  }
}

module.exports = Service
