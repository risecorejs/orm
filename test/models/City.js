const { defineModel, dataTypes } = require('../../index')

const Country = require('./Country')

const City = defineModel('City', {
  id: dataTypes.SERIAL().big().primaryKey(),
  name: dataTypes.STRING(),
  countryId: dataTypes.INTEGER().references(Country, 'id').onDelete('CASCADE').onUpdate('CASCADE'),
  createdAt: dataTypes.TIMESTAMP().tz(),
  updatedAt: dataTypes.TIMESTAMP().tz(),
  deletedAt: dataTypes.TIMESTAMP().tz().nullable()
})

module.exports = City
