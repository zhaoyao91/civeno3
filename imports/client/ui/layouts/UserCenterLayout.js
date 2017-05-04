import React from 'react'

import UserCenterNavs from '../views/UserCenterNavs'
import UserCenterProfileCard from '../views/UserCenterProfileCard'
import SingleCenterColumnLayout from './SingleCenterColumnLayout'

const UserCenterLayout = ({children}) => (
  <SingleCenterColumnLayout style={{paddingTop: '1rem', display: 'flex'}}>
    <div style={{marginRight: '1rem', width: '30%', flexShrink: 0}}>
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
  </SingleCenterColumnLayout>
)

export default UserCenterLayout