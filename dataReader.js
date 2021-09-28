const {promisify} = require('util')
const {readFile} = require('fs')
const promisifiedReadFile = promisify(readFile)

const dataReader = async (path) => {
  const data = await promisifiedReadFile('./src/db.json', 'utf-8')
  return data
}
module.exports = dataReader
