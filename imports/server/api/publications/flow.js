import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { prop } from 'lodash/fp'

import Flows from '../../collections/flows'
import FlowUserRelations from '../../collections/flow_user_relations'

Meteor.publish('Flow.flowsOfOwner', function (owner) {
  check(owner, String)

  this.autorun(function () {
    if (!this.userId) {
      return this.ready()
    } else if (this.userId !== owner) {
      return this.ready()
    }

    this.autorun(function () {
      return FlowUserRelations.find({type: 'owner', userId: owner})
    })

    this.autorun(function () {
      const flowIds = FlowUserRelations.find({type: 'owner', userId: owner}, {fields: {flowId: 1}}).map(prop('flowId'))
      return Flows.find({_id: {$in: flowIds}})
    })
  })
})

Meteor.publish('Flow.flowOfId', function (flowId) {
  check(flowId, String)

  this.autorun(function () {
    if (!this.userId) {
      return this.ready()
    }

    this.autorun(function () {
      const ownerRelation = FlowUserRelations.findOne({
        type: 'owner',
        userId: this.userId,
        flowId: flowId
      }, {fields: {_id: 1}})

      if (ownerRelation) {
        return Flows.find({_id: flowId})
      } else {
        return this.ready()
      }
    })
  })
})