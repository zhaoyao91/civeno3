import { Meteor } from 'meteor/meteor'

import withMeteorData from './with_meteor_data'

export default withMeteorData(() => {
  return {
    userId: Meteor.userId()
  }
})