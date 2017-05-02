import React from 'react'

import MainNavBarLayout from '../layouts/MainNavBarLayout'
import FlowBarLayout from '../layouts/FlowBarLayout'

const FlowInstancesPage = ({match}) => (
  <MainNavBarLayout>
    <FlowBarLayout>
      <h1>flow instances</h1>
    </FlowBarLayout>
  </MainNavBarLayout>
)

export default FlowInstancesPage