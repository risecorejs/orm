const build = require('../utils/data-types/build')

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
     * @param {string} text - The comment to set for the column.
     */
    comment(text) {
      this.options.comment = text

      return this
    },

    // ==========================||
    //          METHODS          ||
    // ==========================||
    build() {
      return build(this.options)
    }
  }
}
