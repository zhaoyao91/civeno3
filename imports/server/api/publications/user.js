import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import Users from '../../collections/users'

Meteor.publish('User.userProfile', function (userId) {
  check(userId, String)

  if (!this.userId) {
    return this.ready()
  } else if (this.userId !== userId) {
    return this.ready()
  }

  return Users.find({_id: userId}, {fields: {profile: 1}})
})