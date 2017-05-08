import FlowSteps from '../collections/flow_steps'

export default {
  // update

  /**
   * create flow step
   * @param flowId
   * @param step
   * @param step.name
   * @param [step.description]
   * @returns stepId
   */
  createStep(flowId, step) {
    return FlowSteps.insert({
      flowId: flowId,
      name: step.name,
      description: step.description,
    })
  },

  /**
   * remove flow step
   * @param stepId
   */
  removeStep(stepId) {
    FlowSteps.remove({_id: stepId})
  }
}