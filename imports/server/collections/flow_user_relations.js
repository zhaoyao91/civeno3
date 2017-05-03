import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const FlowUserRelations = new Mongo.Collection('flow_user_relations')

FlowUserRelations.attachSchema(new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['owner'],
  },

  flowId: {
    type: String,
    index: 1,
  },

  userId: {
    type: String,
    index: 1,
  }
}))

export default FlowUserRelations