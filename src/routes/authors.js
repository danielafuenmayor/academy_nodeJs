/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Router} = require('express')
const authorsRouter = Router()
const articleModel = require('../database/articles')
const authorsModel = require('../database/authors')
const Service = require('../service/authors')
const service = new Service(articleModel, authorsModel)
const logger = require('../logger')

authorsRouter.get('/', async (req, res) => {
  logger.info(`[Authors][List][Request] ${JSON.stringify(req.params)}`)
  try {
    const authors = await service.list()
    logger.info(`[Authors][Get][Response] ${JSON.stringify(authors)}`)
    res.status(200).send(authors)
  } catch (err) {
    logger.info(`[Articles][Get][Error] ${err}`)
    res.status(500).send(JSON.parse(err))
  }
  return
})

authorsRouter.get('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Authors][GetById][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }
  try {
    const author = await service.get(id)
    logger.info(`[Articles][List][Response] ${JSON.stringify(author)}`)
    res.status(200).send(author)
    return
  } catch (err) {
    logger.info(`[Authors][List][Error] ${err}`)
    if (err.message == 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

authorsRouter.post('/', async (req, res) => {
  logger.info(`[Authors][Post][Request] ${JSON.stringify(req.body)}`)
  try {
    const createResult = await service.create(req)
    logger.info(`[Auhtors][Post][Response] ${createResult}`)
    res.status(200).send('Sucessfully created a new author')
  } catch (err) {
    logger.info(`[Articles][Post][Error] ${err}`)
    res.status(500).send(err.message)
    return
  }
})

authorsRouter.patch('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Authors][Patch][Request] ${JSON.stringify(req.body)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    await service.update(req)
    logger.info(`[Authors][Update][Response] ${JSON.stringify(req.body)}`)
    res.status(200).send('Successfully modified an author')
  } catch (err) {
    logger.info(`[Authors][Update][Error] ${err}`)
    if (err.message === 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

authorsRouter.put('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Authors][Put][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }
  try {
    const found = await service.getById(id)
    if (found === null) {
      const createResult = await service.create(req)
      logger.info(`[Authors][Put/Create][Response] ${JSON.stringify(createResult)}`)
      res.status(200).send('Sucessfully created a new author')
      return
    }
    const updateResult = await service.update(req)
    logger.info(`[Authors][Put/Update][Response] ${JSON.stringify(updateResult)}`)
    res.status(200).send('Successfully modified an author')
  } catch (err) {
    logger.info(`[Articles][Put][Error] ${err}`)
    res.status(500).json(err)
    return
  }
})

authorsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params
  logger.info(`[Authors][Delete][Request] ${JSON.stringify(req.params)}`)

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    const deleteResult = await service.delete(req)
    logger.info(`[Authors][Delete][Response] ${JSON.stringify(deleteResult)}`)
    res.status(200).send('Successfully deleted an author')
  } catch (err) {
    logger.info(`[Authors][Delete][Error] ${err}`)
    if (err.message === 'Not found') res.status(404).send(err.message)
    else res.status(500).json(err)
  }
})

module.exports = authorsRouter
