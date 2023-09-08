const build = require('../utils/data-types/build')

module.exports = enumDataType

/**
 * Creates a data type configuration for an enumeration.
 *
 * @param {...string|string[]} enumerations - Enumeration values as multiple string arguments or a single array of strings.
 * @throws {TypeError} Throws an error if any of the enumerations is not of type string.
 * @throws {Error} Throws an error if enumerations is empty.
 */
function enumDataType(...enumerations) {
  if (enumerations.length === 0) {
    throw new Error('Enumerations array cannot be empty.')
  }

  if (enumerations.length === 1 && Array.isArray(enumerations[0])) {
    enumerations = enumerations[0]
  }

  if (enumerations.some((val) => typeof val !== 'string')) {
    throw new TypeError('All enumerations should be of type string.')
  }

  return {
    options: {
      dataType: 'ENUM',
      enumerations: enumerations,
      isNullable: false,
      defaultValue: undefined,
      comment: undefined
    },

    /**
     * Allows the data type to have nullable values, meaning it can have NULL values in the column.
     */
    nullable() {
      this.options.isNullable = true

      return this
    },

    /**
     * Sets the default value for the enumeration. The provided value must be a part of the enumerations.
     *
     * @param {string} val - The value to set as the default. Must be one of the provided enumerations.
     * @throws {TypeError} If the provided value is not a string.
     * @throws {Error} If the provided value is not a part of the enumerations.
     */
    defaultValue(val) {
      if (typeof val !== 'string') {
        throw new TypeError('Expected a string value for default value.')
      }

      if (!this.options.enumerations.includes(val)) {
        throw new Error('Invalid default value. It is not part of the enumerations.')
      }

      this.options.defaultValue = val

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
