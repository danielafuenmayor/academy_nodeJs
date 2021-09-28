/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {readdir, readFile} = require('fs')
const validate = require('./validator.js')
const {promisify} = require('util')
const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)
const {validFilesArray, invalidFilesArray} = require('./arrays')

const readData = async (path) => {
  let fileContent
  let files

  try {
    files = await promisifiedReadDir(path, 'utf-8')

    for (const file of files) {
      fileContent = await promisifiedReadFile(`${path}${file}`, 'utf-8')

      const isFileValid = await validate(fileContent)

      isFileValid ? validFilesArray.push(JSON.parse(fileContent)) : invalidFilesArray.push(JSON.parse(fileContent))
    }
  } catch (err) {
    console.log('There was an error', err)
  }
}
module.exports = readData
