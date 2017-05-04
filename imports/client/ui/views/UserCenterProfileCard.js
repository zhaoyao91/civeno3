import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'
import { prop } from 'lodash/fp'

import UserAvatar from '../views/UserAvatar'
import withCurrentUser from '../hocs/with_current_user'

const UserCenterProfileCard = compose(
  withCurrentUser('user'),
  withProps(({user}) => ({
    name: prop('profile.name', user),
    email: prop('emails.0.address', user)
  }))
)(({name, email}) => (
  <Segment style={{width: '100%', display: 'flex'}}>
    <div style={{marginRight: '1rem'}}>
      <UserAvatar name={name} size={50}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, width: 0}}>
      <NameText>{name}</NameText>
      <EmailText>{name}</EmailText>
    </div>
  </Segment>
))

export default UserCenterProfileCard

const TruncatedTextStyle = {overflow: 'hidden', textOverflow: 'ellipsis'}

const NameText = ({children}) => (
  <Header style={{...TruncatedTextStyle, margin: 0}} title={children}>{children}</Header>
)

const EmailText = ({children}) => (
  <p style={{...TruncatedTextStyle, margin: 0}} title={children}>{children}</p>
)