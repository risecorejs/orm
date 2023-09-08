const build = require('../utils/data-types/build')

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
