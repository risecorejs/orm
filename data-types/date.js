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
      defaultValue: undefined,
      comment: undefined,
      checkConstraint: undefined,
      minDate: undefined,
      maxDate: undefined
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
      this.options.defaultValue = getValidDate(val, 'defaultValue')

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
     * Sets a minimum date for the date data type.
     *
     * If provided value is an instance of Date, it extracts the date in the format YYYY-MM-DD.
     * If provided value is a string, it expects the string to be in the format YYYY-MM-DD.
     *
     * @param {Date|string} val - The value to set as default. Can be a Date object or a string in YYYY-MM-DD format.
     * @throws {Error} Throws an error if the provided value is not a valid Date object or a valid YYYY-MM-DD string.
     */
    minDate(val) {
      this.options.minDate = getValidDate(val, 'minDate')

      return this
    },

    /**
     * Sets a maximum date for the date data type.
     *
     * If provided value is an instance of Date, it extracts the date in the format YYYY-MM-DD.
     * If provided value is a string, it expects the string to be in the format YYYY-MM-DD.
     *
     * @param {Date|string} val - The value to set as default. Can be a Date object or a string in YYYY-MM-DD format.
     * @throws {Error} Throws an error if the provided value is not a valid Date object or a valid YYYY-MM-DD string.
     */
    maxDate(val) {
      this.options.maxDate = getValidDate(val, 'maxDate')

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
      if (this.options.comment) components.push(`COMMENT '${this.options.comment}'`)
      if (this.options.checkConstraint) components.push(`CHECK ${this.options.checkConstraint}`)
      if (this.options.minDate) components.push(`MINVALUE '${this.options.minDate}'`)
      if (this.options.maxDate) components.push(`MAXVALUE '${this.options.maxDate}'`)

      return components.join(' ')
    }
  }
}

/**
 * Validates and formats a date value.
 *
 * @param {Date|string} val - The value to validate and format. Can be a Date object or a string in YYYY-MM-DD format.
 * @param {string} paramName - The name of the parameter being validated (used in error message).
 * @returns {string} The formatted date value in YYYY-MM-DD format.
 * @throws {Error} Throws an error if the provided value is not a valid Date object or a valid YYYY-MM-DD string.
 */
function getValidDate(val, paramName) {
  if (val instanceof Date) {
    return val.toISOString().split('T')[0]
  } else if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return val
  } else {
    throw new Error(`Invalid date format for '${paramName}'. Expected a Date object or a string in YYYY-MM-DD format.`)
  }
}
