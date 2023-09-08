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
    nullable() {
      this.options.isNullable = true

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

      if (this.options.comment) components.push(`COMMENT '${this.options.comment}'`)

      return components.join(' ')
    }
  }
}
