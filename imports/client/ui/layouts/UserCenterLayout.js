import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

import UserCenterNavs from '../views/UserCenterNavs'
import UserCenterProfileCard from '../views/UserCenterProfileCard'

const UserCenterLayout = ({children}) => (
  <Container style={{paddingTop: '2rem', display: 'flex'}}>
    <div style={{marginRight: '2rem', minWidth: '25%', flexShrink: 0}}>
      <div style={{marginBottom: '2rem'}}>
        <UserCenterProfileCard/>
      </div>
      <div>
        <UserCenterNavs/>
      </div>
    </div>
    <div style={{flexGrow: 1}}>
      {children}
    </div>
  </Container>
)

export default UserCenterLayout