import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { assoc, keys, isFunction, reduce } from 'lodash/fp'

export default function () {
  promisifyObject(Meteor)
  promisifyObject(Accounts)
}

function promisifyObject (target) {
  target.async = reduce((asyncMethods, key) => {
    return {
      ...asyncMethods,
      [key](...args) {
        return new Promise((resolve, reject) => {
          target[key](...args, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
        })
      }
    }
  }, {}, keys(target).filter((key) => isFunction(target[key])))
}