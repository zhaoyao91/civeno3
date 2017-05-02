import React from 'react'
import { Container } from 'semantic-ui-react'

const MyPageLayout = ({children}) => (
  <Container style={{paddingTop: '1rem', display: 'flex'}}>
    <div style={{marginRight: '1rem', flexShrink: 0}}>
      <div></div>
      <div></div>
    </div>
    <div style={{flexGrow: 1}}>
      {children}
    </div>
  </Container>
)

export default MyPageLayout