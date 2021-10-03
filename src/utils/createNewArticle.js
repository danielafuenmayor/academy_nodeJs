const validate = require('./validator')
const read = require('./reader')
const write = require('./writer')
const {v4: uuidv4} = require('uuid')
const moment = require('moment')
const path = require('path')

const createNewArticle = async (req) => {
  const newArticle = {
    ...req.body,
    id: uuidv4(),
    publishedAt: moment().format('MM/DD/YYYY'),
    modifiedAt: moment().format('MM/DD/YYYY'),
  }
  try {
    const isArticleValid = await validate(newArticle)
    if (isArticleValid === true) {
      const articles = await read(path.resolve(__dirname, '../db/db.json'))
      articles.push(newArticle)
      await write(articles)
      return true
    }
    return isArticleValid
  } catch (err) {
    return console.log(err)
  }
}
module.exports = createNewArticle
