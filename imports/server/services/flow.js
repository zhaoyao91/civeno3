import Flows from '../../common/collections/flows'

export default {
  /**
   * @param flow
   * @param flow.name
   * @param [flow.description]
   * @param flow.owner
   *
   * @returns flowId
   */
  createFlow(flow) {
    return Flows.insert({
      ...flow,
      createdAt: new Date()
    })
  },

  /**
   * @param owner
   * @returns {Array} flows
   */
  getFlowsByOwner(owner) {
    return Flows.find({owner: owner}).fetch()
  }
}