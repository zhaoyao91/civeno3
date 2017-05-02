import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import FlowService from '../../services/flow'

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
      throw new Meteor.Error('Flow.createFlow.no-permission.not-authenticated', 'user must be logged in')
    }

    return FlowService.createFlow({
      ...flow,
      owner: this.userId,
    })
  }
})