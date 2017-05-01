import { Meteor } from 'meteor/meteor'

const PermissionService = {
  isAuthenticated(userId) {
    if (!userId) {
      deny('not-authenticated', 'user must be logged in')
    }
  }
}

export default PermissionService

function deny (code, reason, details) {
  throw new Meteor.Error(`no-permission.${code}`, reason, details)
}