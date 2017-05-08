import FlowStepLinks from '../collections/flow_step_links'

export default {
  // update

  /**
   * create a step link
   * @param from # source step id
   * @param to # target step id
   * @returns linkId
   */
  createLink(from, to) {
    const link = FlowStepLinks.findOne({from, to}, {fields: {_id: 1}})
    if (link) return link._id
    else return FlowStepLinks.insert({from, to})
  },

  /**
   * remove a step link
   * @param from
   * @param to
   */
  removeLink(from, to) {
    FlowStepLinks.remove(from, to)
  }
}