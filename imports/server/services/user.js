import Users from '../../common/collections/users'

export default {
  /**
   * @param userId
   * @param {Object} profile
   */
  updateProfile(userId, profile) {
    Users.update({_id: userId}, {
      $set: {
        profile: profile
      }
    })
  }
}
