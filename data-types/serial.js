module.exports = serialDataType

function serialDataType() {
  return {
    // ==========================||
    //          OPTIONS          ||
    // ==========================||
    options: {
      dataType: 'SERIAL',
      isPrimaryKey: false
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

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      const components = []

      components.push(this.options.dataType)

      if (this.options.isPrimaryKey) components.push('PRIMARY KEY')

      return components.join(' ')
    }
  }
}
