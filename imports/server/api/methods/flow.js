import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import PermissionService from '../../services/permission'
import FlowService from '../../services/flow'

Meteor.methods({
  /**
   * @param flow
   * @param flow.name
   * @param flow.description
   *
   * @returns flowId
   */
  'Flow.createFlow'(flow) {
    check(flow, {
      name: String,
      description: Match.Optional(String),
    })

    PermissionService.isAuthenticated(this.userId)

    return FlowService.createFlow(flow)
  }
})