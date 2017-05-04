import { Meteor } from 'meteor/meteor'

import withMeteorData from './with_meteor_data'

export default function (propName) {
  return withMeteorData(() => {
    if (Meteor.userId()) {
      Meteor.subscribe('User.userProfile', Meteor.userId())
    }
    return {
      [propName]: Meteor.user()
    }
  })
}