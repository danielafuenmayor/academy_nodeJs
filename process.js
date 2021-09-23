/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {readdir, readFile, writeFile} = require('fs')
const {promisify} = require('util')
const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)
const promisifiedWriteFile = promisify(writeFile)
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

const validate = async (data) => {
  let parsedData

  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    console.log(err)
  }

  try {
    await schema.validate(parsedData)
    return true
  } catch (err) {
    return false
    console.log(err)
  }
}

const writeData = async (validFilesArray, invalidFilesArray) => {
  try {
    await promisifiedWriteFile('./src/db.json', JSON.stringify(validFilesArray) + '\n', {
      encoding: 'utf-8',
      flag: 'a',
    })
    await promisifiedWriteFile('./src/invalid.json', JSON.stringify(invalidFilesArray), {
      encoding: 'utf-8',
      flag: 'a',
    })
  } catch (err) {
    console.log(err)
  }
}

const processData = async (path) => {
  let fileContent
  let files
  const validFilesArray = []
  const invalidFilesArray = []

  try {
    files = await promisifiedReadDir(path, 'utf-8')

    for (const file of files) {
      fileContent = await promisifiedReadFile(`${path}${file}`, 'utf-8')

      const isFileValid = await validate(fileContent)

      isFileValid ? validFilesArray.push(fileContent) : invalidFilesArray.push(fileContent)
    }
  } catch (err) {
    console.log('There was an error', err)
  }
  writeData(validFilesArray, invalidFilesArray)
}

processData(path)
