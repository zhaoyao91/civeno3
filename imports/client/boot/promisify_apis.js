import { Meteor } from 'meteor/meteor'

export default function () {
  Meteor.async = {
    call(...args) {
      return new Promise((resolve, reject) => {
        Meteor.call(...args, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
  }
}