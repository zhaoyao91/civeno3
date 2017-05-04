import React from 'react'
import { Segment } from 'semantic-ui-react'
import { compose } from 'recompose'
import { prop } from 'lodash/fp'

import UserAvatar from '../views/UserAvatar'
import withCurrentUser from '../hocs/with_current_user'

const UserCenterProfileCard = compose(
  withCurrentUser('user')
)(({user}) => (
  <Segment style={{width: '100%', display: 'flex'}}>
    <div style={{marginRight: '1rem'}}>
      <UserAvatar user={user} size={50}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, width: 0}}>
      <TruncatedText>{prop('profile.name', user)}</TruncatedText>
      <TruncatedText>{prop('emails.0.address', user)}</TruncatedText>
    </div>
  </Segment>
))

export default UserCenterProfileCard

const TruncatedText = ({children}) => (
  <div title={children} style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{children}</div>
)