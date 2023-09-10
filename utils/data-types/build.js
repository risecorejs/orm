module.exports = build

function build(options) {
  const clauses = []

  switch (options.dataType) {
    case 'ENUM':
      clauses.push(`${options.dataType}(${options.enumerations.map((val) => `'${val}'`).join(', ')})`)
      break

    case 'VARCHAR':
      clauses.push(`${options.dataType}(${options.length})`)
      break

    default:
      clauses.push(options.dataType)
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
    clauses.push(`REFERENCES "${options.references.tableName}" ("${options.references.column}")`)

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
