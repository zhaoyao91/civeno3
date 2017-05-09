import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { pick } from 'lodash/fp'

import UserService from '../../services/user'
import { testPermission, permissions } from '../../permission'

Meteor.methods({
  /**
   * update user profile name
   *
   * @require-auth
   * @require-perm UPDATE_USER_PROFILE_NAME
   * @precondition user exists
   * @effect user profile name was updated
   *
   * @param userId
   * @param name
   */
  'User.updateProfileName'(userId, name) {
    check(userId, String)
    check(name, String)

    if (!this.userId) {
      throw new Meteor.Error('not-authenticated', 'user must login')
    }
    if (!testPermission(this.userId, permissions.updateUserProfileName(userId))) {
      throw new Meteor.Error('no-permission', 'user is not allowed to update this user\'s profile name')
    }

    UserService.actions.updateProfileName(userId, name)
  },

  /**
   * find user profile by email
   *
   * @require-auth
   *
   * @param email
   * @return {object | null} user // only with _id and profile
   */
  'User.findUserProfileByEmail'(email) {
    check(email, String)

    if (!this.userId) {
      throw new Meteor.Error('not-authenticated', 'user must login')
    }

    const user = UserService.queries.findUserByEmail(email)

    if (user) return pick(['_id', 'profile'], user)
    else return null
  }
})