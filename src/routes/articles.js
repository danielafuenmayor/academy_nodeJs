/* eslint-disable new-cap */
const {Router} = require('express')
const articlesRouter = Router()
const path = require('path')
const read = require('../utils/reader')
const {v4: uuidv4} = require('uuid')
const moment = require('moment')
const validate = require('../utils/validator')
const write = require('../utils/writer')
const assignNewValues = require('../utils/assignValues')

articlesRouter.get('/', async (req, res) => {
  try {
    const articles = await read(path.resolve(__dirname, '../db/db.json'))
    res.status(200).send(articles)
  } catch (err) {
    res.status(500).send(JSON.parse(err))
  }
  return
})

articlesRouter.get('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const articles = await read(path.resolve(__dirname, '../db/db.json'))
    const found = articles.find((e) => e.id === id)
    if (!found) {
      res.status(404).send('not found')
      return
    }
    res.status(200).send(found)
    return
  } catch (err) {
    res.status(500).send(JSON.parse(err))
  }
})

articlesRouter.post('/post', async (req, res) => {
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
      write(articles)
      res.status(200).send('Sucessfully wrote a new article')
      return
    }
    return res.status(400).send(isArticleValid)
  } catch (err) {
    res.status(500).json(err)
    return
  }
})

articlesRouter.patch('/patch', async (req, res) => {
  const {id} = req.body
  const articles = await read(path.resolve(__dirname, '../db/db.json'))

  if (id) {
    const found = articles.find((e) => e.id === id)
    if (!found) res.status(404).send('Article not found')
    else {
      const editedArticle = {
        ...found,
        ...req.body,
        modifiedAt: moment().format('MM/DD/YYYY'),
        publishedAt: found.publishedAt,
      }
      try {
        const isArticleValid = await validate(editedArticle)
        if (isArticleValid === true) {
          assignNewValues(req, found)
          write(articles)
          res.status(200).send(`Successfully modified an article`)
          return
        }
        res.status(400).send(isArticleValid)
      } catch (err) {
        res.status(500).json(err)
      }
    }
    return
  } else res.status(400).send('Id is required')
})

articlesRouter.delete('/delete', async (req, res) => {
  const {id} = req.body
  if (id) {
    const articles = await read(path.resolve(__dirname, '../db/db.json'))
    const found = articles.find((e) => e.id === id)
    if (!found) res.status(404).send('Article not found')
    else {
      const foundIndex = articles.indexOf(found)
      articles.splice(foundIndex, 1)
      write(articles)
      res.status(200).send('Successfully deleted an article')
    }
  }
})
module.exports = articlesRouter
