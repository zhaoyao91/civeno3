import { Meteor } from 'meteor/meteor'

import withMeteorData from './with_meteor_data'

export default function (propName) {
  return withMeteorData(() => {
    return {
      [propName]: Meteor.userId()
    }
  })
}