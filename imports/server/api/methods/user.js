import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import PermissionService from '../../services/permission'
import UserService from '../../services/user'

Meteor.methods({
  /**
   * @param userId
   * @param name
   */
  'User.updateProfileName'(userId, name) {
    check(userId, String)
    check(name, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    } else if (!PermissionService.user.allowUpdateUserProfile(this.userId, userId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to update this user\'s profile')
    }

    UserService.updateProfileName(userId, name)
  }
})