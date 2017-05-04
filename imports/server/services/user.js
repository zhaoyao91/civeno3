import Users from '../collections/users'

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
  }
}
