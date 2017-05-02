import React from 'react'

import MainNavBar from '../views/MainNavBar'

const MainNavBarLayout = ({children}) => (
  <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <div style={{flexShrink: 0}}>
      <MainNavBar/>
    </div>
    <div style={{flexGrow: 1, height: 0}}>
      {children}
    </div>
  </div>
)

export default MainNavBarLayout
