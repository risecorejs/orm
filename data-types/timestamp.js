const build = require('../utils/data-types/build')

module.exports = timestampDataType

function timestampDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'TIMESTAMP',
      isNullable: false,
      comment: undefined
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
    tz() {
      this.options.dataType = 'TIMESTAMPTZ'

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
