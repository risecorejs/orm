const setReferenceAction = require('../utils/data-types/set-reference-action')
const build = require('../utils/data-types/build')

module.exports = stringDataType

/**
 * Creates a data type configuration for a string.
 *
 * @param {number} [length=255] - The maximum length of the string. Defaults to 255.
 * @throws {TypeError} Throws an error if the provided length is not a positive integer.
 */
function stringDataType(length = 255) {
  if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
    throw new TypeError('Length must be a positive integer.')
  }

  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'VARCHAR',
      length,
      isPrimaryKey: false,
      isUnique: false,
      isNullable: false,
      defaultValue: undefined,
      references: undefined,
      comment: undefined
    },

    /**
     * Sets the column as a primary key.
     */
    primaryKey() {
      this.options.isPrimaryKey = true

      return this
    },

    /**
     * Sets the unique constraint for the data type. This constraint ensures that all values in the column are unique.
     */
    unique() {
      this.options.isUnique = true

      return this
    },

    /**
     * Allows the data type to have nullable values, meaning it can have NULL values in the column.
     */
    nullable() {
      this.options.isNullable = true

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

    /**
     * Sets a comment for the integer data type.
     *
     * @param {string} text - The comment to set for the column.
     */
    comment(text) {
      this.options.comment = text

      return this
    },

    /**
     * Builds the SQL representation of the data type configuration.
     */
    build() {
      return build(this.options)
    }
  }
}
