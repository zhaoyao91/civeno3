import React from 'react'

import MainLayout from './MainLayout'
import MainSideNavs from '../views/MainSideNavs'

const MainTopLayout = ({children}) => (
  <MainLayout>
    <div style={{height: '100%', display: 'flex'}}>
      <div style={{flexShrink: 0}}><MainSideNavs/></div>
      <div style={{flexGrow: 1, overflow: 'auto'}}>{children}</div>
    </div>
  </MainLayout>
)

export default MainTopLayout