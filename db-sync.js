const { Client } = require('pg')

module.exports = dbSync

async function dbSync(connectionParameters, models) {
  const client = new Client(connectionParameters)

  await client.connect()

  await client.end()
}
