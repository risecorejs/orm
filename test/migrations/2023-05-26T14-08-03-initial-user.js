module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user', {
      id: 'BIGSERIAL PRIMARY KEY',
      cityId: 'INTEGER NOT NULL REFERENCES city (id) ON DELETE CASCADE ON UPDATE CASCADE',
      name: 'VARCHAR(255) NOT NULL',
      email: 'VARCHAR(255) UNIQUE NOT NULL',
      phoneNumber: 'VARCHAR(255) UNIQUE NOT NULL',
      password: 'VARCHAR(255) NOT NULL',
      onlineStatus: "ENUM('offline', 'online', 'invisible') NOT NULL DEFAULT offline",
      lastActivity: 'TIMESTAMPTZ NULL',
      createdAt: 'TIMESTAMPTZ NOT NULL',
      updatedAt: 'TIMESTAMPTZ NOT NULL',
      deletedAt: 'TIMESTAMPTZ NULL'
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user')
  }
}
