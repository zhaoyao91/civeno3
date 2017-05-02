import React from 'react'

import FlowBar from '../views/FlowBar'

const FlowBarLayout = ({children}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
    <div style={{paddingTop: '0.5rem'}}>
      <FlowBar/>
    </div>
    <div style={{flexGrow: 1, height: 0}}>
      {children}
    </div>
  </div>
)

export default FlowBarLayout