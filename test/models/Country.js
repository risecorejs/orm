const { defineModel, dataTypes } = require('../../index')

const Country = defineModel('Country', {
  id: dataTypes.SERIAL().big().primaryKey(),
  name: dataTypes.STRING(),
  createdAt: dataTypes.TIMESTAMP().tz(),
  updatedAt: dataTypes.TIMESTAMP().tz(),
  deletedAt: dataTypes.TIMESTAMP().tz().nullable()
})

module.exports = Country
