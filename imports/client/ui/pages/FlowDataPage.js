import React from 'react'

import MainNavBarLayout from '../layouts/MainNavBarLayout'
import FlowBarLayout from '../layouts/FlowBarLayout'

const FlowDataPage = ({match}) => (
  <MainNavBarLayout>
    <FlowBarLayout flowId={match.params.flowId}>
      <h1>flow data</h1>
    </FlowBarLayout>
  </MainNavBarLayout>
)

export default FlowDataPage