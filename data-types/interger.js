const setReferenceAction = require('../utils/data-types/set-reference-action')
const build = require('../utils/data-types/build')

module.exports = integerDataType

function integerDataType() {
  return {
    options: {
      dataType: 'INTEGER',
      isPrimaryKey: false,
      isUnique: false,
      isNullable: false,
      defaultValue: undefined,
      references: undefined,
      comment: undefined,
      checkConstraint: undefined
    },

    /**
     * Sets the data type to SMALLINT.
     */
    small() {
      this.options.dataType = 'SMALLINT'

      return this
    },

    /**
     * Sets the data type to BIGINT.
     */
    big() {
      this.options.dataType = 'BIGINT'

      return this
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
     * Sets the default value for the integer data type.
     *
     * @param {number} val - The integer value to set as default.
     * @throws {TypeError} If the provided value is not an integer.
     */
    defaultValue(val) {
      if (typeof val !== 'number' || !Number.isInteger(val)) {
        throw new TypeError('Expected an integer value for default value.')
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
     * Sets a check constraint for the date data type.
     *
     * @param {string} constraint - The check constraint to apply.
     */
    checkConstraint(constraint) {
      this.options.checkConstraint = constraint

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
