const build = require('../utils/data-types/build')

module.exports = timestampDataType

function timestampDataType() {
  return {
    options: {
      dataType: 'TIMESTAMP',
      isNullable: false,
      checkConstraint: undefined,
      comment: undefined
    },

    /**
     * Sets the data type to TIMESTAMPTZ.
     */
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
     * Sets a check constraint for the date data type.
     *
     * @param {string} constraint - The check constraint to apply.
     */
    checkConstraint(constraint) {
      this.options.checkConstraint = constraint

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
