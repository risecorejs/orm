module.exports = textDataType

function textDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'TEXT',
      isNullable: false
    },

    // ==========================||
    //          SETTERS          ||
    // ==========================||
    nullable() {
      this.options.isNullable = true

      return this
    },

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(this.options.dataType)
      components.push(this.options.isNullable ? 'NULL' : 'NOT NULL')

      return components.join(' ')
    }
  }
}
