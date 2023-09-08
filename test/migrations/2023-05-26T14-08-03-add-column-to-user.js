const { dataTypes } = require('../../index')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('user', 'test', 'VARCHAR(255) NOT NULL')
  },
  down: async (queryInterface, dataTypes) => {
    await queryInterface.dropColumn('user')
  }
}
