import React from 'react'
import Avatar from 'react-avatar'
import { propOr } from 'lodash/fp'

const UserAvatar = ({name = '', size, style}) => (
  <Avatar round size={size} style={style} value={name.slice(0, 2)}/>
)

export default UserAvatar