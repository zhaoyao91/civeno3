import React from 'react'

const FlowDefinitionPage = ({match}) => (
  <div>
    Flow Definition Page
    {match.params.flowId}
  </div>
)

export default FlowDefinitionPage