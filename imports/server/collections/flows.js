import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const Flows = new Mongo.Collection('flows')

Flows.attachSchema(new SimpleSchema({
  name: {
    type: String
  },

  description: {
    type: String,
    optional: true
  },

  // userId
  owner: {
    type: String
  },

  createdAt: {
    type: Date
  }
}))

export default Flows