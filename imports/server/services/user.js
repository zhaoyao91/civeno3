import Users from '../collections/users'
import { Accounts } from 'meteor/accounts-base'
import { check, Match } from 'meteor/check'


export default {
  actions: {
    /**
     * update user profile name
     * @pre
     * - user exists
     * @post
     * - user profile name was updated
     * @param userId
     * @param name
     */
    updateProfileName(userId, name) {
      check(userId, String)
      check(name, String)

      Users.update({_id: userId}, {$set: {'profile.name': name}})
    }
  },

  queries: {
    /**
     * find user by email
     * @param email
     * @returns user
     */
    findUserByEmail(email) {
      return Accounts.findUserByEmail(email)
    },
  },

  conditions: {
    /**
     * check if the user exists
     * @param userId
     */
    userExits(userId) {
      return Users.find({_id: userId}, {fields: {_id: 1}, limit: 1}).count() > 0
    }
  },

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
