import Flows from '../../common/collections/flows'

export default {
  /**
   * @param flow
   * @param flow.name
   * @param [flow.description]
   *
   * @returns flowId
   */
  createFlow(flow) {
    return Flows.insert(flow)
  }
}