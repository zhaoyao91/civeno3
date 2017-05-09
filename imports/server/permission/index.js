import * as roles from './roles'
import * as permissions from './permissions'
import { some, omit } from 'lodash/fp'

/**
 * check if user has a specific permission
 * @param {String} userId
 * @param {Object} permission // {type, ...args}
 * @returns {Boolean} result
 */
function testPermission (userId, permission) {
  return some(role => {
    const roleInstance = role.resolvePermission(permission)
    if (roleInstance) {
      return role.testUser(userId, omit(['type'], roleInstance))
    }
  }, roles)
}

export {
  permissions,
  testPermission,
}