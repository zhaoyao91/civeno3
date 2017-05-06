import Users from '../collections/users'
import { Accounts } from 'meteor/accounts-base'

export default {
  // update

  /**
   * @param userId
   * @param name
   */
  updateProfileName(userId, name) {
    Users.update({_id: userId}, {
      $set: {
        'profile.name': name
      }
    })
  },

  // query

  /**
   * @param email
   * @returns user
   */
  findUserByEmail(email) {
    return Accounts.findUserByEmail(email)
  },

  // check

  userExists(userId) {
    return Users.find({_id: userId}, {fields: {_id: 1}, limit: 1}).count() > 0
  }
}
