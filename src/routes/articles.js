/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Router} = require('express')
const articlesRouter = Router()
const path = require('path')
const read = require('../utils/reader')
const write = require('../utils/writer')
const createNewArticle = require('../utils/createNewArticle')
const editArticle = require('../utils/editArticle')

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

articlesRouter.post('/', async (req, res) => {
  try {
    const createResult = await createNewArticle(req, res)
    if (createResult === true) res.status(200).send('Sucessfully wrote a new article')
    else return res.status(400).send(createResult)
  } catch (err) {
    res.status(500).json(err)
    return
  }
})

articlesRouter.patch('/', async (req, res) => {
  const {id} = req.body
  const articles = await read(path.resolve(__dirname, '../db/db.json'))

  if (id) {
    const found = articles.find((e) => e.id === id)
    if (!found) res.status(404).send('Article not found')
    else {
      try {
        const editResult = await editArticle(req, articles, found)
        if (editResult === true) res.status(200).send(`Successfully modified an article`)
        else return res.status(400).send(editResult)
      } catch (err) {
        res.status(500).json
      }
    }
    return
  } else res.status(400).send('Id is required')
})

articlesRouter.put('/', async (req, res) => {
  const {id} = req.body

  const articles = await read(path.resolve(__dirname, '../db/db.json'))
  const found = articles.find((e) => e.id === id)

  if (!found) {
    try {
      const createResult = await createNewArticle(req, res)
      if (createResult === true) res.status(200).send('Sucessfully wrote a new article')
      else return res.status(400).send(createResult)
    } catch (err) {
      res.status(500).json(err)
      return
    }
  } else {
    try {
      const editResult = await editArticle(req, articles, found)
      if (editResult === true) res.status(200).send(`Successfully modified an article`)
      else return res.status(400).send(editResult)
    } catch (err) {
      res.status(500).json
    }
  }
})

articlesRouter.delete('/', async (req, res) => {
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
  } else res.status(404).send('Id is required')
})

module.exports = articlesRouter
