/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {readdir, readFile} = require('fs')
const {promisify} = require('util')
const yup = require('yup')
const path = './src/dataset/'
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

const validator = async (data) => {
  let parsedData

  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    console.log(err)
  }

  try {
    await schema.validate(parsedData)
    console.log(true)
  } catch (err) {
    console.log(false)
  }
}

const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)

const readAndValidateData = async (path) => {
  try {
    const files = await promisifiedReadDir(path, 'utf-8')

    for (const file of files) {
      const fileContent = await promisifiedReadFile(`${path}${file}`, 'utf-8')
      validator(fileContent)
    }
  } catch (err) {
    console.log('There was an error', err)
  }
}
readAndValidateData(path)
