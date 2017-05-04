import React from 'react'
import Avatar from 'react-avatar'
import { propOr } from 'lodash/fp'

const UserAvatar = ({name, size, style}) => (
  <Avatar round size={size} style={style} value={name.slice(0, 1)}/>
)

export default UserAvatar