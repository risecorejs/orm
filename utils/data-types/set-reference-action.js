const _ = require('lodash')

module.exports = setReferenceAction

/**
 * @typedef {'CASCADE' | 'SET NULL' | 'NO ACTION' | 'RESTRICT' | 'SET DEFAULT'} Action
 * @typedef {'onDelete' | 'onUpdate'} ActionType
 */

/**
 * Sets a reference action (either ON DELETE or ON UPDATE) for a given references object.
 *
 * @param {Object} references - The REFERENCES object.
 * @param {ActionType} type - The type of reference action.
 * @param {Action} action - The action to be taken for the specified type.
 * @throws {Error} When no REFERENCES has been defined for the data type.
 * @throws {Error} When the provided action is not one of the allowed actions.
 * @throws {Error} When the provided type is not one of the allowed types.
 */
function setReferenceAction(references, type, action) {
  const validActions = ['CASCADE', 'SET NULL', 'NO ACTION', 'RESTRICT', 'SET DEFAULT']

  if (!validActions.includes(action)) {
    throw new Error(`Invalid action "${action}". Allowed actions are: ${validActions.join(', ')}.`)
  }

  if (!['onDelete', 'onUpdate'].includes(type)) {
    throw new Error(`Invalid type provided: ${type}. Allowed types are "onDelete" and "onUpdate".`)
  }

  if (references) {
    references[type] = action
  } else {
    throw new Error(`Cannot set ${_.startCase(type).toUpperCase()} action because no REFERENCES has been provided.`)
  }
}
