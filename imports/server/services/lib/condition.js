import { Meteor } from 'meteor/meteor'

export default class Condition {
  constructor (judge, error, reason) {
    this._judge = judge
    this._error = error
    this._reason = reason
  }

  judge (...args) {
    return this._judge(...args)
  }

  check (...args) {
    if (!this.judge(...args)) {
      throw new Meteor.Error(`invalid-condition.${this._error}`, this._reason)
    }
  }
}