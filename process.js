/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const readData = require('./reader.js')
const writeData = require('./writer.js')
const path = './src/dataset/'

const processData = async (path) => {
  await readData(path)
  await writeData(path)
}

processData(path)
