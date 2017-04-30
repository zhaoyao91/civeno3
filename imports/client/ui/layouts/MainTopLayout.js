import React from 'react'

import MainLayout from './MainLayout'
import MainSideNavs from '../views/MainSideNavs'

const MainTopLayout = ({children}) => (
  <MainLayout>
    <div style={{height: '100%', display: 'flex'}}>
      <div><MainSideNavs/></div>
      <div style={{flexGrow: 1}}>{children}</div>
    </div>
  </MainLayout>
)

export default MainTopLayout