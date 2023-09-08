module.exports = dateDataType

function dateDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'DATE',
      isUnique: false,
      isNullable: false,
      defaultValue: undefined
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
    unique() {
      this.options.isUnique = true
      return this
    },
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
          'Invalid date format for defaultValue. Expected a Date object or a string in YYYY-MM-DD format.'
        )
      }

      return this
    },

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(this.options.dataType)

      if (this.options.isUnique) components.push('UNIQUE')

      components.push(this.options.isNullable ? 'NULL' : 'NOT NULL')

      if (this.options.defaultValue !== undefined) components.push(`DEFAULT '${this.options.defaultValue}'`)

      return components.join(' ')
    }
  }
}
