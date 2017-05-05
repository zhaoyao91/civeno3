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