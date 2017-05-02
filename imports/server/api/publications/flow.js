import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import Flows from '../../../common/collections/flows'

Meteor.publish('Flow.flowsOfOwner', function (owner) {
  check(owner, String)

  if (!this.userId) {
    return this.ready()
  } else if (this.userId !== owner) {
    return this.ready()
  }

  return Flows.find({owner: owner})
})