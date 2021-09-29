/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {writeFile} = require('fs')
const {promisify} = require('util')
const promisifiedWriteFile = promisify(writeFile)
const {validFilesArray, invalidFilesArray} = require('./arrays')

const writeData = async () => {
  try {
    await promisifiedWriteFile('./src/db.json', JSON.stringify(validFilesArray), {
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
module.exports = writeData
