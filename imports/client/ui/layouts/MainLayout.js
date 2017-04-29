import React from 'react'

import MainNavBar from '../views/MainNavBar'

const MainLayout = ({children}) => (
  <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <div><MainNavBar/></div>
    <div style={{flexGrow: 1}}>{children}</div>
  </div>
)

export default MainLayout
