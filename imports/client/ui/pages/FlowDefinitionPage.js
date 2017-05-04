import React from 'react'

import MainNavBarLayout from '../layouts/MainNavBarLayout'
import FlowBarLayout from '../layouts/FlowBarLayout'

const FlowDefinitionsPage = ({match}) => (
  <MainNavBarLayout>
    <FlowBarLayout flowId={match.params.flowId}>
      <h1>flow definition</h1>
    </FlowBarLayout>
  </MainNavBarLayout>
)

export default FlowDefinitionsPage