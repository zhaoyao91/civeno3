import React from 'react'

import FlowBar from '../views/FlowBar'

const FlowBarLayout = ({children, flowId}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
    <div style={{paddingTop: '0.5rem'}}>
      <FlowBar flowId={flowId}/>
    </div>
    <div style={{flexGrow: 1, height: 0}}>
      {children}
    </div>
  </div>
)

export default FlowBarLayout