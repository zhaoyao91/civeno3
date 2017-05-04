import React from 'react'
import Avatar from 'react-avatar'
import { propOr } from 'lodash/fp'

const UserAvatar = ({user, size, style}) => (
  <Avatar round size={size} style={style} value={propOr('', 'profile.name', user).slice(0, 1)}/>
)

export default UserAvatar