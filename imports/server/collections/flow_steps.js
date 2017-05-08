import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const FlowSteps = new Mongo.Collection('flow_steps')

FlowSteps.attachSchema(new SimpleSchema({
  flowId: {
    type: String,
    index: true,
  },

  name: {
    type: String,
  },

  description: {
    type: String,
    optional: true
  },
}))

export default FlowSteps