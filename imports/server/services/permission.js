import FlowService from './flow'

import Condition from './lib/condition'

const PermissionService = {
  user: {
    allowUpdateUserProfile(userId, targetUserId) {
      return userId === targetUserId
    }
  },

  flow: {
    allowUpdateFlow(userId, flowId) {
      return FlowService.userIsFlowOwner(userId, flowId)
    },

    allowTransferFlow(userId, flowId) {
      return FlowService.userIsFlowOwner(userId, flowId)
    }
  }
}

export default PermissionService