import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { pick } from 'lodash/fp'

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
  },

  /**
   * find user by email
   * only return its profile
   * @param email
   * @returns user | null
   */
  'User.findUserByEmail'(email) {
    check(email, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    const user = UserService.findUserByEmail(email)

    if (user) return pick(['_id', 'profile'], user)
    else return null
  }
})