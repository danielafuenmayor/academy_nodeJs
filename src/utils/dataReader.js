const {promisify} = require('util')
const {readFile} = require('fs')
const promisifiedReadFile = promisify(readFile)

const dataReader = async (path) => {
  const data = await promisifiedReadFile(path, 'utf-8')
  return JSON.parse(data)
}
module.exports = dataReader
