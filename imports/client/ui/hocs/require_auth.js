import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import withMeteorData from './with_meteor_data'

const requireAuth = (Component) => {
  return withMeteorData(() => ({
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
  }))(({userId, loggingIn, ...otherProps}) => {
      if (loggingIn) {
        return <div>登录中，请稍后……</div>
      } else if (userId) {
        return <Component {...otherProps}/>
      } else {
        return <Redirect to="/login"/>
      }
    }
  )
}

export default requireAuth