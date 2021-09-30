const {promisify} = require('util')
const {readFile} = require('fs')
const promisifiedReadFile = promisify(readFile)

const reader = async (path) => {
  try {
    const data = await promisifiedReadFile(path, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    const data = []
    return data
  }
}
module.exports = reader
