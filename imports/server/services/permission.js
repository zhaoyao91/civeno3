import FlowService from './flow'

const PermissionService = {
  flow: {
    allowUpdateFlow(userId, flowId) {
      return FlowService.userIsFlowOwner(userId, flowId)
    }
  }
}

export default PermissionService