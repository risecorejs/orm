const build = require('../utils/data-types/build')

module.exports = timeDataType

function timeDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'TIME',
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
     * Sets the default value for the time data type.
     *
     * If provided value is an instance of Date, it extracts the time.
     * If provided value is a string, it expects the string to be in the format HH:MM:SS.
     *
     * @param {Date|string} val - The value to set as default. Can be a Date object or a string in HH:MM:SS format.
     * @throws {Error} Throws an error if the provided value is not a valid Date object or a valid HH:MM:SS string.
     */
    defaultValue(val) {
      if (val instanceof Date) {
        this.options.defaultValue = val.toTimeString().split(' ')[0]
      } else if (typeof val === 'string' && /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val)) {
        this.options.defaultValue = val
      } else {
        throw new Error('Invalid time format for defaultValue. Expected a Date object or a string in HH:MM:SS format.')
      }

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
