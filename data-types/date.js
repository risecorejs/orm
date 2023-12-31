const build = require('../utils/data-types/build')

module.exports = dateDataType

function dateDataType() {
  return {
    options: {
      dataType: 'DATE',
      dataTypeAlias: 'DATE',
      isUnique: false,
      isNullable: false,
      defaultValue: undefined,
      checkConstraint: undefined,
      comment: undefined
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
     * Sets the default value for the date data type.
     *
     * If provided value is an instance of Date, it extracts the date in the format YYYY-MM-DD.
     * If provided value is a string, it expects the string to be in the format YYYY-MM-DD.
     *
     * @param {Date|string} val - The value to set as default. Can be a Date object or a string in YYYY-MM-DD format.
     * @throws {Error} Throws an error if the provided value is not a valid Date object or a valid YYYY-MM-DD string.
     */
    defaultValue(val) {
      if (val instanceof Date) {
        this.options.defaultValue = val.toISOString().split('T')[0]
      } else if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        this.options.defaultValue = val
      } else {
        throw new Error(
          `Invalid date format for 'defaultValue'. Expected a Date object or a string in YYYY-MM-DD format.`
        )
      }

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
