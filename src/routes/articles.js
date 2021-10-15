/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Router} = require('express')
const articlesRouter = Router()
const articleModel = require('../database/articles')
const authorsModel = require('../database/authors')
const Service = require('../service/articles')
const service = new Service(articleModel, authorsModel)
const logger = require('../logger')

articlesRouter.get('/', async (req, res) => {
  logger.info(`[Articles][List][Request] ${JSON.stringify(req.params)}`)
  try {
    const articles = await service.list()
    logger.info(`[Articles][Get][Response] ${JSON.stringify(articles)}`)
    res.status(200).send(articles)
  } catch (err) {
    logger.info(`[Articles][Get][Error] ${err}`)
    res.status(500).send(JSON.parse(err))
  }
})

articlesRouter.get('/:id', async (req, res) => {
  const {id} = req.params

  logger.info(`[Articles][GetById][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    const article = await service.get(id)
    logger.info(`[Articles][List][Response] ${JSON.stringify(article)}`)
    res.status(200).send(article)
  } catch (err) {
    logger.info(`[Articles][List][Error] ${err}`)
    if (err.message == 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

articlesRouter.post('/', async (req, res) => {
  logger.info(`[Articles][Post][Request] ${JSON.stringify(req.body)}`)

  try {
    const createResult = await service.create(req)
    logger.info(`[Articles][Post][Response] ${createResult}`)
    res.status(200).send('Sucessfully created a new article')
  } catch (err) {
    logger.info(`[Articles][Post][Error] ${err}`)
    res.status(500).send(err.message)
  }
})

articlesRouter.patch('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Articles][Patch][Request] ${JSON.stringify(req.body)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    await service.update(req)
    logger.info(`[Articles][Update][Response] ${JSON.stringify(req.body)}`)
    res.status(200).send('Successfully modified an article')
  } catch (err) {
    logger.info(`[Articles][Update][Error] ${err}`)
    if (err.message === 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

articlesRouter.put('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Articles][Put][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    const found = await service.getById(id)
    if (found === null) {
      const createResult = await service.create(req)
      logger.info(`[Articles][Put/Create][Response] ${JSON.stringify(createResult)}`)
      res.status(200).send('Sucessfully created a new article')
      return
    }
    const updateResult = await service.update(req)
    logger.info(`[Articles][Put/Update][Response] ${JSON.stringify(updateResult)}`)
    res.status(200).send('Successfully modified an article')
  } catch (err) {
    logger.info(`[Articles][Put][Error] ${err}`)
    res.status(500).json(err)
  }
})

articlesRouter.delete('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Articles][Delete][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    const deleteResult = await service.delete(id)
    logger.info(`[Articles][Delete][Response] ${JSON.stringify(deleteResult)}`)
    res.status(200).send('Successfully deleted an article')
  } catch (err) {
    logger.error(`[Articles][Delete][Error] ${err}`)
    if (err.message === 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

module.exports = articlesRouter
