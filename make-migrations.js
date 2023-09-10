const fs = require('fs/promises')
const path = require('path')
const prettier = require('prettier')
const { format } = require('date-fns')
const _ = require('lodash')
const consola = require('consola')

module.exports = makeMigrations

async function makeMigrations(models, options) {
  const snapshot = await getOrInitSnapshot(options.outputPath)

  for (const model of models) {
    if (snapshot[model.name]) {
    } else {
      await createInitialMigration(snapshot, model, options.outputPath)
    }
  }
}

async function getOrInitSnapshot(outputPath) {
  const filePath = path.join(outputPath, 'snapshot.json')

  try {
    return require(filePath)
  } catch (err) {
    await fs.writeFile(filePath, '{}')

    return {}
  }
}

async function createInitialMigration(snapshot, model, outputPath) {
  snapshot[model.name] = {}

  for (const [columnName, columnDataType] of Object.entries(model.columns)) {
    snapshot[model.name][columnName] = columnDataType.options
  }

  await createMigrationFile(
    'initial',
    model.tableName,
    outputPath,
    `const { dataTypes } = require('../../index')
    
      module.exports = {
        async up(queryInterface) {
          await queryInterface.createTable('${model.tableName}', ${getModelColumns(model.columns)})
        },
        async down(queryInterface) {
          await queryInterface.dropTable('${model.tableName}')
        }
      }`
  )
}

async function createMigrationFile(prefix, tableName, outputPath, content) {
  const fileTimestamp = format(new Date(), "yyyy-MM-dd'T'HH-mm-ss")
  const filename = `${fileTimestamp}-${prefix}-${tableName}.js`
  const filePath = outputPath + `/` + filename

  await fs.writeFile(
    filePath,
    prettier.format(content, {
      trailingComma: 'none',
      tabWidth: 2,
      semi: false,
      singleQuote: true,
      printWidth: 120,
      parser: 'babel'
    })
  )

  consola.success('Migration created: ' + filename)
}

function getModelColumns(columns) {
  const result = {}

  for (const [name, { options }] of Object.entries(columns)) {
    result[name] = []

    const dataTypeArgs = []

    switch (options.dataType) {
      case 'ENUM':
        dataTypeArgs.push(`[${options.enumerations.map((item) => `'${item}'`)}]`)
        break

      case 'VARCHAR':
        if (options.length !== 255) {
          dataTypeArgs.push(options.length)
        }
    }

    result[name].push(`dataTypes.${options.dataTypeAlias}(${dataTypeArgs.join('')})`)

    if (options.isPrimaryKey) {
      result[name].push('primaryKey()')
    }

    if (options.isUnique) {
      result[name].push('unique()')
    }

    if (options.isNullable === false) {
      result[name].push('nullable()')
    }

    if (options.defaultValue !== undefined) {
      if (typeof options.defaultValue === 'string') {
        result[name].push(`defaultValue('${options.defaultValue}')`)
      } else {
        result[name].push(`defaultValue(${options.defaultValue})`)
      }
    }

    if (options.checkConstraint) {
      result[name].push(`checkConstraint('${options.checkConstraint}')`)
    }

    if (options.references) {
      result[name].push(`references('${options.references.tableName}', '${options.references.column}')`)

      if (options.references.onDelete) {
        result[name].push(`onDelete('${options.references.onDelete}')`)
      }

      if (options.references.onUpdate) {
        result[name].push(`onUpdate('${options.references.onUpdate}')`)
      }
    }

    if (options.comment) {
      result[name].push(`comment('${options.comment}')`)
    }

    result[name] = result[name].join('.')
  }

  return JSON.stringify(result, null, 2).replaceAll(': "', ': ').replaceAll(')"', ')')
}
