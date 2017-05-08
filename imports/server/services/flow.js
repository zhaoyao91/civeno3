import { prop } from 'lodash/fp'

import Flows from '../collections/flows'
import FlowUserRelations from '../collections/flow_user_relations'

export default {
  // update

  /**
   * @param flow
   * @param flow.name
   * @param [flow.description]
   * @param owner # owner userId
   *
   * @returns flowId
   */
  createFlow({flow, owner}) {
    const flowId = Flows.insert({
      ...flow,
      createdAt: new Date()
    })
    FlowUserRelations.insert({
      type: 'owner',
      flowId: flowId,
      userId: owner
    })
    return flowId
  },

  /**
   * @param flowId
   * @param name
   */
  updateFlowName(flowId, name) {
    Flows.update({_id: flowId}, {$set: {name: name}})
  },

  updateFlowDescription(flowId, description) {
    Flows.update({_id: flowId}, {$set: {description: description}})
  },

  addOwner(flowId, owner) {
    const relation = {type: 'owner', flowId: flowId, userId: owner}
    FlowUserRelations.upsert(relation, {$set: relation})
  },

  removeOwner(flowId, owner) {
    FlowUserRelations.remove({type: 'owner', flowId: flowId, userId: owner})
  },

  transferFlow(flowId, targetUserId) {
    FlowUserRelations.find({type: 'owner', flowId: flowId}, {
      fields: {
        _id: 0,
        userId: 1
      }
    }).forEach(ownerShip => this.removeOwner(flowId, ownerShip.userId))
    this.addOwner(flowId, targetUserId)
  },

  freezeFlowStructure(flowId) {
    Flows.update({_id: flowId}, {
      $set: {
        structureFrozen: true
      }
    })
  },

  // check

  /**
   * check if the user is the owner of the flow
   * @param userId
   * @param flowId
   * @returns {Boolean} result
   */
  userIsFlowOwner(userId, flowId) {
    return FlowUserRelations.find({
        type: 'owner',
        userId: userId,
        flowId: flowId
      }, {fields: {_id: 1}, limit: 1}).count() > 0
  }
}