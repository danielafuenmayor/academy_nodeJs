/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {writeFile} = require('fs')
const {promisify} = require('util')
const path = require('path')
const promisifiedWriteFile = promisify(writeFile)

const write = async (articles) => {
  try {
    await promisifiedWriteFile(path.resolve(__dirname, '../db/db.json'), JSON.stringify(articles), {
      encoding: 'utf-8',
    })
  } catch (err) {
    console.log(err)
  }
}
module.exports = write
