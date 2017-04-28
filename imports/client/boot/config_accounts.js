import { Accounts } from 'meteor/accounts-base'

export default function (history) {
  Accounts.onResetPasswordLink((token, done) => {
    history.push(`/reset-password/${token}`)
    done()
  })
}