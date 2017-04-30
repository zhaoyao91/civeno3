import React from 'react'

import MainNavBar from '../views/MainNavBar'

const MainLayout = ({children}) => (
  <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <div><MainNavBar/></div>
    <div style={{flexGrow: 1, display: 'flex'}}>
      <div style={{flexGrow: 1}}>{children}</div>
    </div>
  </div>
)

export default MainLayout
