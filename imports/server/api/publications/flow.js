import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { prop } from 'lodash/fp'

import Flows from '../../collections/flows'
import FlowUserRelations from '../../collections/flow_user_relations'

Meteor.publish('Flow.flowsOfOwner', function (owner) {
  check(owner, String)

  this.autorun(function () {
    const ownerRelationsCursor = FlowUserRelations.find({type: 'owner', userId: owner})
    const flowIds = ownerRelationsCursor.map(prop('flowId'))
    this.autorun(function () {
      const flowsCursor = Flows.find({_id: {$in: flowIds}})
      return [ownerRelationsCursor, flowsCursor]
    })
  })
})