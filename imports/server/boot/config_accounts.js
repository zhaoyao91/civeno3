import { Accounts } from 'meteor/accounts-base'
import { assoc, defaults, prop } from 'lodash/fp'

export default function () {
  // set default profile.name for new user
  Accounts.onCreateUser((options, user) => {
    const profile = defaults({
      name: getDefaultNameOfUser(user)
    }, options.profile)

    return assoc('profile', profile, user)
  })
}

/**
 * extract prefix of user email as default name
 * @param user
 * @returns {String} defaultName
 */
function getDefaultNameOfUser (user) {
  const email = prop('emails.0.address', user)
  if (!email) {
    return 'NoName'
  } else {
    return prop('1', email.match(/^(.*)@/))
  }
}