import React from 'react'
import { Redirect } from 'react-router-dom'

const FlowPage = ({match}) => (
  <Redirect to={`/flow/${match.params.flowId}/definition`}/>
)

export default FlowPage