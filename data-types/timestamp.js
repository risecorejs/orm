module.exports = timestampDataType

function timestampDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'TIMESTAMP',
      isNullable: false
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
