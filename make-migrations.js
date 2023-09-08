const fs = require('fs/promises')
const path = require('path')

module.exports = makeMigrations

async function makeMigrations(models, options) {
  const snapshot = await getOrInitSnapshot(options.outputPath)

  for (const model of models) {
    if (snapshot[model.name]) {
    } else {
      await createInitialMigration(snapshot, model)
    }
  }

  console.log(JSON.stringify(snapshot, null, 2))
}

async function getOrInitSnapshot(basePath) {
  const filePath = path.join(basePath, 'snapshot.json')

  try {
    return require(filePath)
  } catch (err) {
    await fs.writeFile(filePath, '{}')

    return {}
  }
}

async function createInitialMigration(snapshot, model) {
  snapshot[model.name] = {
    columns: {}
  }

  for (const [columnName, columnDataType] of Object.entries(model.columns)) {
    snapshot[model.name].columns[columnName] = columnDataType.build()
  }
}
