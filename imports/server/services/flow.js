import { prop } from 'lodash/fp'
import { check, Match } from 'meteor/check'

import Condition from './lib/condition'
import Flows from '../collections/flows'
import FlowUserRelations from '../collections/flow_user_relations'
import UserService from './user'

const FlowService = {
  actions: {
    /**
     * create a flow
     * @pre
     * @post
     * - a new flow was created
     * @param flow
     * @param flow.name
     * @param [flow.description]
     * @returns flowId
     */
    createFlow(flow) {
      check(flow, {
        name: String,
        description: Match.Optional(String)
      })

      return Flows.insert({
        ...flow,
        createdAt: new Date()
      })
    },

    /**
     * add a owner for flow
     * @pre
     * - flow exists
     * - owner exists
     * - flow has no owner
     * @post
     * - an ownership between the flow and user was created
     * @param flowId
     * @param owner
     */
    addOwner(flowId, owner) {
      check(flowId, String)
      check(owner, String)

      FlowService.conditions.flowExists.check(flowId)
      UserService.conditions.userExists.check(owner)
      FlowService.conditions.flowHasNoOwner.check(flowId)

      FlowUserRelations.insert({type: 'owner', flowId: flowId, userId: owner})
    }
  },

  queries: {},

  conditions: {
    flowExists: new Condition((flowId) => {
      return Flows.find({_id: flowId}, {fields: {_id: 1}, limit: 1}).count() > 0
    }, 'no-flow', 'cannot find this flow'),

    flowHasOwner: new Condition((flowId) => {
      return FlowUserRelations.find({type: 'owner', flowId}, {fields: {_id: 1}, limit: 1}).count() > 0
    }, 'flow-has-no-owner', 'flow does not has any owner'),

    flowHasNoOwner: new Condition((flowId) => {
      return !FlowService.conditions.flowHasOwner.judge(flowId)
    }, 'flow-has-owner', 'flow already has owner')
  },

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
  },

  /**
   * check if the flow structure is frozen
   * @param flowId
   * @returns {Boolean} result
   */
  freezeFlowStructureIsFrozen(flowId) {
    return Flows.find({
        _id: flowId,
        structureFrozen: true
      }, {fields: {_id: 1}, limit: 1}).count() > 0
  },

  /**
   * check if the flow exists
   * @param flowId
   * @returns {Boolean} result
   */
  checkFlowExists(flowId) {
    return Flows.find({_id: flowId}, {fields: {_id: 1}, limit: 1}).count() > 0
  }
}

export default FlowService