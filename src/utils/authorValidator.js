/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const yup = require('yup')

const schema = yup.object().shape({
  name: yup.string().max(255).required(),
  articles: yup.array().min(1).max(3),
})

const validate = async (data) => {
  try {
    await schema.validate(data)
    return true
  } catch (err) {
    return err.errors
  }
}
module.exports = validate
