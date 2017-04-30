import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { compose, branch, renderComponent } from 'recompose'

import withMeteorData from './with_meteor_data'

const LoggingIn = () => (<div>登录中，请稍后……</div>)

const Redirection = () => (<Redirect to="/login"/>)

const requireAuth = compose(
  withMeteorData(() => ({
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
  })),
  branch(({loggingIn}) => loggingIn, renderComponent(LoggingIn)),
  branch(({userId}) => !userId, renderComponent(Redirection)),
)

export default requireAuth