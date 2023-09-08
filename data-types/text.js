const build = require('../utils/data-types/build')

module.exports = textDataType

function textDataType() {
  return {
    options: {
      dataType: 'TEXT',
      isNullable: false,
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
