import Flows from '../collections/flows'
import FlowUserRelations from '../collections/flow_user_relations'

export default {
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
}