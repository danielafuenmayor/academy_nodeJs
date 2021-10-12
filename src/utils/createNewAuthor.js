const validate = require('./authorValidator')
const authorModel = require('../database/authors')

const createNewAuthor = async (req) => {
  const newAuthor = {
    ...req.body,
  }
  try {
    const isAuthorValid = await validate(newAuthor)
    if (isAuthorValid === true) {
      await authorModel.create(newAuthor)
      return true
    }
    return isAuthorValid
  } catch (err) {
    return console.log(err)
  }
}
module.exports = createNewAuthor
