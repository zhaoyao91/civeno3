import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { prop } from 'lodash/fp'

import Flows from '../../collections/flows'
import Users from '../../collections/users'
import FlowUserRelations from '../../collections/flow_user_relations'

Meteor.publish('Flow.flowsOfOwner', function (owner) {
  check(owner, String)

  if (!this.userId) {
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

Meteor.publish('Flow.flowOfId', function (flowId) {
  check(flowId, String)

  if (!this.userId) {
    return this.ready()
  }

  return Flows.find({_id: flowId})
})

Meteor.publish('Flow.ownersOfFlow', function (flowId) {
  check(flowId, String)

  if (!this.userId) {
    return this.ready()
  }

  this.autorun(function () {
    return FlowUserRelations.find({type: 'owner', flowId: flowId})
  })

  this.autorun(function () {
    const userIds = FlowUserRelations.find({type: 'owner', flowId: flowId}, {fields: {userId: 1}}).map(prop('userId'))
    return Users.find({_id: {$in: userIds}}, {fields: {profile: 1}})
  })
})