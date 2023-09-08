const { defineModel, dataTypes } = require('../../index')

const City = require('./City')

const User = defineModel('User', {
  id: dataTypes.SERIAL().big().primaryKey(),
  cityId: dataTypes.INTEGER().references(City, 'id').onDelete('CASCADE').onUpdate('CASCADE'),
  name: dataTypes.STRING(),
  email: dataTypes.STRING().unique(),
  phoneNumber: dataTypes.STRING().unique(),
  password: dataTypes.STRING(),
  onlineStatus: dataTypes.ENUM('offline', 'online', 'invisible').defaultValue('offline'),
  lastActivity: dataTypes.TIMESTAMP().tz().nullable(),
  createdAt: dataTypes.TIMESTAMP().tz(),
  updatedAt: dataTypes.TIMESTAMP().tz(),
  deletedAt: dataTypes.TIMESTAMP().tz().nullable()
})

module.exports = User
