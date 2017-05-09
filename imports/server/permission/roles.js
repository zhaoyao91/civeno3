/**
 * a role instance is an object of type and its args
 * objects below help you build role instances, define and leverage its logic
 *
 * - build(...args): role instance
 * - testUser(user, args): result // check if the user is such a role with specific args
 * - resolvePermission(permission): role instance // try to return a role instance which has the given permission
 */

export const user = {
  build(userId) {
    return {
      type: 'USER',
      userId: userId,
    }
  },

  testUser(userId, args) {
    return !!userId && userId === args.userId
  },

  resolvePermission(permission) {
    switch (permission.type) {
      case 'UPDATE_USER_PROFILE_NAME':
        return this.build(permission.userId)
    }
  }
}