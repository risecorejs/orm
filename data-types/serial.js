module.exports = serialDataType

function serialDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'SERIAL',
      isPrimaryKey: false,
      comment: undefined
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
    small() {
      this.options.dataType = 'SMALLSERIAL'

      return this
    },
    big() {
      this.options.dataType = 'BIGSERIAL'

      return this
    },
    primaryKey() {
      this.options.isPrimaryKey = true

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

      if (this.options.isPrimaryKey) components.push('PRIMARY KEY')
      if (this.options.comment) components.push(`COMMENT '${this.options.comment}'`)

      return components.join(' ')
    }
  }
}
