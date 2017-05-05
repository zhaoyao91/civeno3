import Users from '../collections/users'
import { Accounts } from 'meteor/accounts-base'

export default {
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

  /**
   * @param email
   * @returns user
   */
  findUserByEmail(email) {
    return Accounts.findUserByEmail(email)
  }
}
