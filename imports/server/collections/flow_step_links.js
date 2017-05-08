import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const FlowStepLinks = new Mongo.Collection('flow_step_links')

FlowStepLinks.attachSchema(new SimpleSchema({
  // step id
  from: {
    type: String,
    index: true
  },

  // step id
  to: {
    type: String,
    index: true
  },
}))

export default FlowStepLinks