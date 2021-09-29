/* eslint-disable new-cap */
const {Router} = require('express')
const articlesRouter = Router()
const path = require('path')
const reader = require('../utils/dataReader')

articlesRouter.get('/', async (req, res) => {
  try {
    const articles = await reader(path.resolve(__dirname, '../db/db.json'))
    res.status(200).send(articles)
  } catch (err) {
    console.log(err)
    res.status(500).send(JSON.parse(err))
  }
  return
})

articlesRouter.get('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const articles = await reader(path.resolve(__dirname, '../db/db.json'))
    const found = articles.find((e) => e.id === id)
    if (!found) {
      res.status(404).send('not found')
      return
    }
    res.status(200).send(found)
    return
  } catch (err) {
    console.log(err)
    res.status(500).send(JSON.parse(err))
  }
})

module.exports = articlesRouter
