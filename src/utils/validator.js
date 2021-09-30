/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const yup = require('yup')
const today = new Date()

const schema = yup.object().shape({
  id: yup.string().min(36).max(36).required(),
  title: yup.string().max(255).required(),
  publishedAt: yup.date('mm/dd/yyyy').max(today).nullable(),
  url: yup.string().when('publishedAt', {
    is: (value) => !!value,
    then: yup.string().url().matches(/https/).required(),
  }),
  keywords: yup.array().min(1).max(3),
  modifiedAt: yup.date('mm/dd/yyyy').max(today).required(),
  author: yup.string().max(100).required(),
  readMins: yup.number().min(1).max(20).required(),
  source: yup
    .string()
    .matches(/(BLOG|TWEET|ARTICLE|NEWSPAPER)/)
    .required(),
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
