const build = require('../utils/data-types/build')

module.exports = serialDataType

function serialDataType() {
  return {
    options: {
      dataType: 'SERIAL',
      isPrimaryKey: false,
      comment: undefined
    },

    /**
     * Sets the data type to SMALLSERIAL.
     */
    small() {
      this.options.dataType = 'SMALLSERIAL'

      return this
    },

    /**
     * Sets the data type to BIGSERIAL.
     */
    big() {
      this.options.dataType = 'BIGSERIAL'

      return this
    },

    /**
     * Sets the column as a primary key.
     */
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

    /**
     * Builds the SQL representation of the data type configuration.
     */
    build() {
      return build(this.options)
    }
  }
}
