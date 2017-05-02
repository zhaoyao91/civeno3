import { Accounts } from 'meteor/accounts-base'

export default function (history) {
  // properly redirect user to reset-password page
  Accounts.onResetPasswordLink((token, done) => {
    history.push(`/reset-password/${token}`)
    done()
  })
}