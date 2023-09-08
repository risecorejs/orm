const build = require('../utils/data-types/build')

module.exports = booleanDataType

function booleanDataType() {
  return {
    options: {
      dataType: 'BOOLEAN',
      isNullable: false,
      defaultValue: undefined,
      comment: undefined
    },

    /**
     * Allows the data type to have nullable values, meaning it can have NULL values in the column.
     */
    nullable() {
      this.options.isNullable = true

      return this
    },

    /**
     * Sets the default value for the boolean data type.
     *
     * @param {boolean} val - The boolean value to set as default.
     * @throws {TypeError} If the provided value is not a boolean.
     */
    defaultValue(val) {
      if (typeof val !== 'boolean') {
        throw new TypeError('Expected a boolean value for default value.')
      }

      this.options.defaultValue = val

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
