/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {readdir, readFile} = require('fs')
const {promisify} = require('util')
const moment = require('moment')
const path = './src/dataset/'

const isIdValid = (file) => {
  if (typeof file.id === 'string' && file.id.length === 36) return true
}
const isTitleValid = (file) => {
  if (typeof file.title === 'string' && file.title.length <= 255) return true
}
const isAuthorValid = (file) => {
  if (file.author != '' && typeof file.author === 'string' && file.author.length <= 100) return true
}
const isModifiedAtValid = (file) => {
  const modifiedAtDate = moment(file.date)
  if (modifiedAtDate !== undefined && modifiedAtDate !== null && moment(modifiedAtDate, 'mmm/dd/yyyy')) return true
}
const isPublishedAtValid = (file) => {
  const publishedDate = moment(file.date)

  if (publishedDate === null || publishedDate === undefined) return true
  else if (moment(publishedDate, 'mmm/dd/yyyy')) return true
}
const isUrlValid = (file) => {
  const publishedDate = file.publishedAt
  const protocol = 'https://'

  if (file.url === '' || file.url === null || file.url === undefined) {
    return !publishedDate
  } else if (file.url.substr(0, 8) === protocol) {
    return true
  }
}
const isKeywordsValid = (file) => {
  if (Array.isArray(file.keywords) && file.keywords.length > 0 && file.keywords.length <= 3) return true
}
const isReadMinsValid = (file) => {
  if (file.readMins >= 1 && file.readMins < 20) return true
}
const isSourceValid = (file) => {
  if (file.source === 'ARTICLE' || file.source === 'BLOG' || file.source === 'TWEET' || file.source === 'NEWSPAPER') {
    return true
  }
}

const validator = (data) => {
  let parsedData

  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    console.log(err)
  }

  if (
    isIdValid(parsedData) &&
    isTitleValid(parsedData) &&
    isAuthorValid(parsedData) &&
    isUrlValid(parsedData) &&
    isKeywordsValid(parsedData) &&
    isReadMinsValid(parsedData) &&
    isSourceValid(parsedData) &&
    isPublishedAtValid(parsedData) &&
    isModifiedAtValid(parsedData)
  ) {
    console.log(parsedData.id, true)
  } else console.log(parsedData.id, false)
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
