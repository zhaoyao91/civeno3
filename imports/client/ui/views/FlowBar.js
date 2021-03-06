import React from 'react'

import FlowTabs from './FlowTabs'
import FlowBarButtons from './FlowBarButtons'

const FlowBar = ({flowId}) => (
  <div style={{position: 'relative'}}>
    <FlowTabs/>
    <div style={{position: 'absolute', right: 0, top: 0, bottom: 0}}>
      <FlowBarButtons flowId={flowId}/>
    </div>
  </div>
)

export default FlowBar