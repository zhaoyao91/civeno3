import Flows from '../collections/flows'
import FlowUserRelations from '../collections/flow_user_relations'

const PermissionService = {
  flow: {
    allowUpdateFlow(userId, flowId) {
      return FlowUserRelations.find({
          type: 'owner',
          userId: userId,
          flowId: flowId
        }, {fields: {_id: 1}}).count() > 0
    }
  }
}

export default PermissionService