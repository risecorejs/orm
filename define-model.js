const _ = require('lodash')

module.exports = defineModel

function defineModel(modelName, columns) {
  return {
    name: modelName,
    tableName: _.snakeCase(modelName),
    columns
  }
}
