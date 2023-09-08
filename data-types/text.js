module.exports = textDataType

function textDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'TEXT',
      isNullable: false,
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
