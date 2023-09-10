const build = require('../utils/data-types/build')

module.exports = textDataType

function textDataType() {
  return {
    options: {
      dataType: 'TEXT',
      dataTypeAlias: 'TEXT',
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
     * Sets the default value for the text data type.
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

    /**
     * Sets a comment for the column.
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
