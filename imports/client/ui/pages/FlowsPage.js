import React from 'react'
import { Card } from 'semantic-ui-react'
import { flatten } from 'lodash/fp'
import { compose, withState, withHandlers } from 'recompose'

import MainTopLayout from '../layouts/MainTopLayout'
import CreateFlowModal from '../views/CreateFlowModal'

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
      flatten([children]).map((card, index) => (
        <div key={index} style={{float: 'left', marginRight: '1em', marginBottom: '1em'}}>{card}</div>
      ))
    }
  </div>
)

const CreateFlowCard = compose(
  withState('modalVisible', 'setModalVisible', false),
  withHandlers({
    openModal: ({setModalVisible}) => () => setModalVisible(true),
    closeModal: ({setModalVisible}) => () => setModalVisible(false),
  }),
)(({modalVisible, openModal, closeModal}) => (
  <Card style={{width: '300px', height: '170px'}} onClick={openModal}>
    <Card.Content style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Card.Header>创建流程</Card.Header>
    </Card.Content>
    <CreateFlowModal open={modalVisible} onOpen={openModal} onClose={closeModal}/>
  </Card>
))