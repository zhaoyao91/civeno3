import React from 'react'
import { Card } from 'semantic-ui-react'

import MainTopLayout from '../layouts/MainTopLayout'

const FlowsPage = () => (
  <MainTopLayout>
    <CardLayout>
      <CreateFlowCard/>
    </CardLayout>
  </MainTopLayout>
)

export default FlowsPage

const CardLayout = ({children}) => (
  <div style={{padding: '1em', overflow: 'auto'}}>
    {
      children.map((card, index) => (
        <div key={index} style={{float: 'left', marginRight: '1em', marginBottom: '1em'}}>{card}</div>
      ))
    }
  </div>
)

const FlowCard = ({children}) => (
  <Card style={{width: '300px', height: '170px'}}>
    {children}
  </Card>
)

const CreateFlowCard = () => (
  <FlowCard>
    <Card.Content style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Card.Header>创建流程</Card.Header>
    </Card.Content>
  </FlowCard>
)