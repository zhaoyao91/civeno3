import FlowService from './flow'

const PermissionService = {
  user: {
    allowUpdateUserProfile(userId, targetUserId) {
      return userId === targetUserId
    }
  },

  flow: {
    allowUpdateFlow(userId, flowId) {
      return FlowService.userIsFlowOwner(userId, flowId)
    }
  }
}

export default PermissionService