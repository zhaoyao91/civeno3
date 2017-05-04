import React from 'react'

import MainNavBarLayout from '../layouts/MainNavBarLayout'
import FlowBarLayout from '../layouts/FlowBarLayout'

const FlowInstancesPage = ({match}) => (
  <MainNavBarLayout>
    <FlowBarLayout flowId={match.params.flowId}>
      <h1>flow instances</h1>
    </FlowBarLayout>
  </MainNavBarLayout>
)

export default FlowInstancesPage