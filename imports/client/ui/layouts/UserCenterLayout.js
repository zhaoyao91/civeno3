import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

import UserCenterNavs from '../views/UserCenterNavs'
import UserCenterProfileCard from '../views/UserCenterProfileCard'

const UserCenterLayout = ({children}) => (
  <Container style={{paddingTop: '1rem', display: 'flex'}}>
    <div style={{marginRight: '1rem', width: '25%', flexShrink: 0}}>
      <div style={{marginBottom: '1rem'}}>
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