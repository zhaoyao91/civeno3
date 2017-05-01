import React from 'react'
import { Card } from 'semantic-ui-react'
import { flatten } from 'lodash/fp'
import { compose, withState, withHandlers } from 'recompose'

import MainTopLayout from '../layouts/MainTopLayout'
import CreateFlowModal from '../views/CreateFlowModal'

const FlowsPage = () => (
  <MainTopLayout>
    <CardsLayout>
      <CreateFlowCard/>
    </CardsLayout>
  </MainTopLayout>
)

export default FlowsPage

const CardsLayout = ({children}) => (
  <div style={{height: '100%', overflow: 'auto', padding: '2rem 0 0 2rem'}}>
    {
      flatten([children]).map((card, index) => (
        <div key={index} style={{float: 'left', marginRight: '2rem', marginBottom: '2rem'}}>{card}</div>
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
      <p style={{fontSize: '2rem', color: 'initial'}}>创建流程</p>
    </Card.Content>
    <CreateFlowModal open={modalVisible} onOpen={openModal} onClose={closeModal}/>
  </Card>
))