const setReferenceAction = require('../utils/data-types/set-reference-action')

module.exports = stringDataType

function stringDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'VARCHAR',
      length: 255,
      isPrimaryKey: false,
      isUnique: false,
      isNullable: false,
      defaultValue: undefined,
      references: undefined
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
    primaryKey() {
      this.options.isPrimaryKey = true
      return this
    },
    unique() {
      this.options.isUnique = true
      return this
    },
    nullable() {
      this.options.isNullable = true
      return this
    },

    /**
     * Sets the length for the string data type.
     *
     * @param {number} num - The length for the string data type.
     * @throws {TypeError} If the provided length is not a number.
     */
    length(num) {
      if (typeof num !== 'number') {
        throw new TypeError('Expected a number for the string length.')
      }

      this.options.length = num

      return this
    },

    /**
     * Sets the default value for the string data type.
     *
     * @param {string} val - The string value to set as default.
     * @throws {TypeError} If the provided value is not a string.
     */
    defaultValue(val) {
      if (typeof val !== 'string') {
        throw new TypeError('Expected a string value for default value.')
      }

      this.options.defaultValue = val

      return this
    },

    references(model, column) {
      this.options.references = { model, column }

      return this
    },

    /**
     * @typedef {'CASCADE' | 'SET NULL' | 'NO ACTION' | 'RESTRICT' | 'SET DEFAULT'} Action
     */

    /**
     * Sets the action to be taken when referenced data is deleted.
     *
     * @param {Action} action - The action to be taken when referenced data is deleted.
     * @throws {Error} When no REFERENCES has been defined for the data type.
     * @throws {Error} When the provided action is not one of the allowed actions.
     * @throws {Error} When the provided type is not one of the allowed types.
     */
    onDelete(action) {
      setReferenceAction(this.options.references, 'onDelete', action)

      return this
    },

    /**
     * Sets the action to be taken when referenced data is updated.
     *
     * @param {Action} action - The action to be taken when referenced data is updated.
     * @throws {Error} When no REFERENCES has been defined for the data type.
     * @throws {Error} When the provided action is not one of the allowed actions.
     * @throws {Error} When the provided type is not one of the allowed types.
     */
    onUpdate(action) {
      setReferenceAction(this.options.references, 'onUpdate', action)

      return this
    },

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(`${this.options.dataType}(${this.options.length})`)

      if (this.options.isPrimaryKey) components.push('PRIMARY KEY')
      if (this.options.isUnique) components.push('UNIQUE')

      components.push(this.options.isNullable ? 'NULL' : 'NOT NULL')

      if (this.options.defaultValue !== undefined) components.push(`DEFAULT '${this.options.defaultValue}'`)

      if (this.options.references) {
        components.push(`REFERENCES "${this.options.references.model.tableName}" ("${this.options.references.column}")`)

        if (this.options.references.onDelete) components.push(`ON DELETE ${this.options.references.onDelete}`)
        if (this.options.references.onUpdate) components.push(`ON UPDATE ${this.options.references.onUpdate}`)
      }

      return components.join(' ')
    }
  }
}
