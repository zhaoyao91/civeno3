import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import PermissionService from '../../services/permission'
import FlowService from '../../services/flow'
import UserService from '../../services/user'

Meteor.methods({
  /**
   * @param flow
   * @param flow.name
   * @param [flow.description]
   *
   * @returns flowId
   */
  'Flow.createFlow'(flow) {
    check(flow, {
      name: String,
      description: Match.Optional(String),
    })

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    return FlowService.createFlow({
      flow: flow,
      owner: this.userId,
    })
  },

  'Flow.updateFlowName'(flowId, name) {
    check(flowId, String)
    check(name, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    if (!PermissionService.flow.allowUpdateFlow(this.userId, flowId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to update this flow')
    }

    FlowService.updateFlowName(flowId, name)
  },

  'Flow.updateFlowDescription'(flowId, description) {
    check(flowId, String)
    check(description, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    if (!PermissionService.flow.allowUpdateFlow(this.userId, flowId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to update this flow')
    }

    FlowService.updateFlowDescription(flowId, description)
  },

  'Flow.transferFlow'(flowId, targetUserId) {
    check(flowId, String)
    check(targetUserId, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    if (!PermissionService.flow.allowTransferFlow(this.userId, flowId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to transfer this flow')
    }

    if (!UserService.userExists(targetUserId)) {
      throw new Meteor.Error('invalid-condition.no-target-user', 'cannot find target user')
    }

    FlowService.transferFlow(flowId, targetUserId)
  },

  /**
   * @param flowId
   */
  'Flow.freezeFlowStructure'(flowId) {
    check(flowId, String)

    if (!this.userId) {
      throw new Meteor.Error('no-permission.not-authenticated', 'user must login')
    }

    if (!PermissionService.flow.allowUpdateFlow(this.userId, flowId)) {
      throw new Meteor.Error('no-permission.not-authorized', 'user is not allowed to update this flow')
    }

    FlowService.freezeFlowStructure(flowId)
  }
})