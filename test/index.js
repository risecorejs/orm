const path = require('path')

const { makeMigrations } = require('../index')

const Country = require('./models/Country')
const City = require('./models/City')
const User = require('./models/User')

makeMigrations([Country, City, User], {
  outputPath: path.resolve('migrations')
}).then((result) => {
  console.log(result)
})
