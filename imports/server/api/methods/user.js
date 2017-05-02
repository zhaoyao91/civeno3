import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import UserService from '../../services/user'

Meteor.methods({
  /**
   * @param userId
   * @param {Object} profile
   */
  'User.updateProfile'(userId, profile) {
    check(userId, String)
    check(profile, Object)

    if (!this.userId) {
      throw new Meteor.Error('User.updateProfile.no-permission.not-authenticated', 'user must be logged in')
    } else if (this.userId !== userId) {
      throw new Meteor.Error('User.updateProfile.no-permission', 'you cannot update other user\'s profile')
    }

    UserService.updateProfile(userId, profile)
  }
})