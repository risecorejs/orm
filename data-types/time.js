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

    // ==========================||
    //          SETTERS          ||
    // ==========================||
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
     * @param {string} comment - The comment to set for the column.
     */
    comment(comment) {
      this.options.comment = comment

      return this
    },

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(this.options.dataType)
      components.push(this.options.isNullable ? 'NULL' : 'NOT NULL')

      if (this.options.defaultValue !== undefined) components.push(`DEFAULT '${this.options.defaultValue}'`)
      if (this.options.comment) components.push(`COMMENT '${this.options.comment}'`)

      return components.join(' ')
    }
  }
}
