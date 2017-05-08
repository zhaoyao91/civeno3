import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import PermissionService from '../../services/permission'
import FlowService from '../../services/flow'
import FlowStepService from '../../services/flow_step'

Meteor.methods({
  /**
   * create flow step
   * @param flowId
   * @param step
   * @param step.name
   * @param [step.description]
   * @returns stepId
   */
  'FlowStep.createStep'(flowId, step) {
    check(flowId, String)
    check(step, {
      name: String,
      description: Match.Optional(String)
    })

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    if (!PermissionService.flow.allowUpdateFlow(this.userId, flowId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to update this flow')
    }

    if (!FlowService.checkFlowExists(flowId)) {
      throw new Meteor.Error('invalid-condition.no-flow', 'cannot find this flow')
    }

    return FlowStepService.createStep(flowId, step)
  }
})