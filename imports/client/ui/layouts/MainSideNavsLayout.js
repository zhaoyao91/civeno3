import React from 'react'

import MainSideNavs from '../views/MainSideNavs'

const MainSideNavsLayout = ({children}) => (
  <div style={{height: '100%', display: 'flex'}}>
    <div style={{flexShrink: 0}}>
      <MainSideNavs/>
    </div>
    <div style={{flexGrow: 1, width: 0}}>
      {children}
    </div>
  </div>
)

export default MainSideNavsLayout