import { Meteor } from 'meteor/meteor'

import withMeteorData from './with_meteor_data'

export default withMeteorData(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('User.userProfile', Meteor.userId())
  }
  return {
    user: Meteor.user()
  }
})