import React from 'react'

import MainNavBarLayout from '../layouts/MainNavBarLayout'
import FlowBarLayout from '../layouts/FlowBarLayout'

const FlowApplicationsPage = ({match}) => (
  <MainNavBarLayout>
    <FlowBarLayout flowId={match.params.flowId}>
      <h1>flow applications</h1>
    </FlowBarLayout>
  </MainNavBarLayout>
)

export default FlowApplicationsPage