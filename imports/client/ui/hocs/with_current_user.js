import { Meteor } from 'meteor/meteor'
import { SubsCache } from 'meteor/ccorcos:subs-cache'

import withMeteorData from './with_meteor_data'

const subsCache = new SubsCache()

export default function (propName) {
  return withMeteorData(() => {
    if (Meteor.userId()) {
      subsCache.subscribe('User.userProfile', Meteor.userId())
    }
    return {
      [propName]: Meteor.user()
    }
  })
}