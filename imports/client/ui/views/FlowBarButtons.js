import React from 'react'
import { Icon } from 'semantic-ui-react'
import { compose } from 'recompose'

const FlowBarButtons = compose(

)(() => (
  <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
    <IconButton name="mail outline"/>
    <IconButton name="setting"/>
  </div>
))

const IconButton = ({name}) => (
  <div style={{height: '100%', padding: '0 0.5rem', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    <Icon name={name} size="big" style={{margin: 0}}/>
  </div>
)

export default FlowBarButtons