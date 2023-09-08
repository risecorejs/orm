module.exports = booleanDataType

function booleanDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'BOOLEAN',
      isNullable: false,
      defaultValue: undefined
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
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

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(this.options.dataType)
      components.push(this.options.isNullable ? 'NULL' : 'NOT NULL')

      if (this.options.defaultValue !== undefined) components.push(`DEFAULT '${this.options.defaultValue}'`)

      return components.join(' ')
    }
  }
}
