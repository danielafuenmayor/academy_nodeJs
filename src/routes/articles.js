/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Router} = require('express')
const articlesRouter = Router()
const moment = require('moment')
const createNewArticle = require('../utils/createNewArticle')
const editArticle = require('../utils/editArticle')
const deleteArticle = require('../utils/deleteArticle')
const articleModel = require('../database/articles')

articlesRouter.get('/', async (req, res) => {
  try {
    const articles = await articleModel.list()
    res.status(200).send(articles)
  } catch (err) {
    res.status(500).send(JSON.parse(err))
  }
  return
})

articlesRouter.get('/:id', async (req, res) => {
  const {id} = req.params

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const found = await articleModel.get(id)
      if (!found) {
        res.status(404).send('Article not found')
        return
      }
      res.status(200).send(found)
      return
    } catch (err) {
      res.status(500).send(JSON.parse(err))
    }
  } else res.status(400).send('Invalid Id')
})

articlesRouter.post('/', async (req, res) => {
  try {
    const createResult = await createNewArticle(req)
    if (createResult === true) res.status(200).send('Sucessfully wrote a new article')
    else return res.status(400).send(createResult)
  } catch (err) {
    res.status(500).json(err)
    return
  }
})

articlesRouter.patch('/:id', async (req, res) => {
  const {id} = req.params
  const found = await articleModel.get(id)

  if (!found) {
    res.status(404).send('Article not found')
    return
  }

  const editedArticle = {
    ...req.body,
    modifiedAt: moment().format('MM/DD/YYYY'),
  }

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      await articleModel.update(id, editedArticle)
      res.status(200).send(`Successfully modified an article`)
    } catch (err) {
      res.status(500).json(err)
    }
  } else res.status(400).send('Invalid id')
})

articlesRouter.put('/:id', async (req, res) => {
  const {id} = req.params

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const found = await articleModel.get(id)

    if (found === null) {
      try {
        const createResult = await createNewArticle(req)
        if (createResult === true) res.status(200).send('Sucessfully wrote a new article')
        else return res.status(400).send(createResult)
      } catch (err) {
        res.status(500).json(err)
        return
      }
    }

    try {
      const editResult = await editArticle(id, req)
      if (editResult) res.status(200).send(`Successfully modified an article`)
      else return res.status(200).send(editResult)
    } catch (err) {
      res.status(500).json(err)
    }
  } else res.status(400).send('Invalid id')
})

articlesRouter.delete('/:id', async (req, res) => {
  const {id} = req.params

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const deleteResult = await deleteArticle(id)
      if (deleteResult === true) {
        res.status(200).send('Successfully deleted an article')
      } else res.status(404).send('Article not found')
    } catch (err) {
      console.log(err)
    }
  } else res.status(404).send('Invalid Id')
})

module.exports = articlesRouter
