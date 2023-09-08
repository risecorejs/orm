module.exports = build

function build(options) {
  const clauses = []

  switch (options.dataType) {
    case 'BOOLEAN':
    case 'DATE':
    case 'SMALLINT':
    case 'INTEGER':
    case 'BIGINT':
    case 'SMALLSERIAL':
    case 'SERIAL':
    case 'BIGSERIAL':
    case 'TEXT':
    case 'TIME':
    case 'TIMESTAMP':
    case 'TIMESTAMPTZ':
      clauses.push(options.dataType)
      break

    case 'ENUM':
      clauses.push(`${options.dataType}(${options.enumerations.map((val) => `'${val}'`).join(', ')})`)
      break

    case 'VARCHAR':
      clauses.push(`${options.dataType}(${options.length})`)
      break
  }

  if (options.isPrimaryKey) {
    clauses.push('PRIMARY KEY')
  }

  if (options.isUnique) {
    clauses.push('UNIQUE')
  }

  if (options.isNullable === false) {
    clauses.push('NOT NULL')
  }

  if (options.defaultValue !== undefined) {
    if (typeof options.defaultValue === 'string') {
      clauses.push(`DEFAULT '${options.defaultValue}'`)
    } else {
      clauses.push(`DEFAULT ${options.defaultValue}`)
    }
  }

  if (options.checkConstraint) {
    clauses.push(`CHECK ${options.checkConstraint}`)
  }

  if (options.references) {
    clauses.push(`REFERENCES "${options.references.model.tableName}" ("${options.references.column}")`)

    if (options.references.onDelete) {
      clauses.push(`ON DELETE ${options.references.onDelete}`)
    }

    if (options.references.onUpdate) {
      clauses.push(`ON UPDATE ${options.references.onUpdate}`)
    }
  }

  if (options.comment) {
    clauses.push(`COMMENT '${options.comment}'`)
  }

  return clauses.join(' ')
}
