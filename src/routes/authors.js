/* eslint-disable max-len */
/* eslint-disable new-cap */
const {Router} = require('express')
const authorsRouter = Router()
const authorsModel = require('../database/authors')
const createNewAuthor = require('../utils/createNewAuthor')

authorsRouter.get('/', async (req, res) => {
  try {
    const authors = await authorsModel.list()
    res.status(200).send(authors)
  } catch (err) {
    res.status(500).send(JSON.parse(err))
  }
  return
})

authorsRouter.get('/:id', async (req, res) => {
  const {id} = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }
  try {
    const found = await authorsModel.get(id)
    if (!found) {
      res.status(404).send('Author not found')
      return
    }
    res.status(200).send(found)
    return
  } catch (err) {
    res.status(500).send(JSON.parse(err))
  }
})

authorsRouter.post('/', async (req, res) => {
  try {
    const createResult = await createNewAuthor(req)
    if (createResult === true) res.status(200).send('Sucessfully created a new author')
    else return res.status(400).send(createResult)
  } catch (err) {
    res.status(500).json(err)
    return
  }
})

authorsRouter.patch('/:id', async (req, res) => {
  const {id} = req.params
  const found = await authorsModel.get(id)

  if (!found) {
    res.status(404).send('Author not found')
    return
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  try {
    await authorsModel.update(id, req.body)
    res.status(200).send('Successfully modified an author')
  } catch (err) {
    res.status(500).json(err)
  }
})

authorsRouter.put('/:id', async (req, res) => {
  const {id} = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send('Invalid Id')
    return
  }

  const found = await authorsModel.get(id)

  if (found === null) {
    try {
      const createResult = await createNewAuthor(req)
      if (createResult === true) res.status(200).send('Sucessfully created a new author')
      else return res.status(400).send(createResult)
    } catch (err) {
      res.status(500).json(err)
      return
    }
  }
  try {
    await authorsModel.update(id, req.body)
    res.status(200).send('Successfully modified an author')
  } catch (err) {
    res.status(500).json(err)
  }
})

authorsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const deleteResult = await authorsModel.delete(id)
      if (deleteResult !== null) res.status(200).send('Successfully deleted an author')
      else res.status(404).send('Author not found')
    } catch (err) {
      console.log(err)
    }
  } else res.status(404).send('Invalid Id')
})

module.exports = authorsRouter
