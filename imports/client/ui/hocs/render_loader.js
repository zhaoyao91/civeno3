import React from 'react'
import { renderComponent } from 'recompose'
import { Loader } from 'semantic-ui-react'

const renderLoader = renderComponent(() => (<Loader active inline="centered" style={{margin: '1rem auto'}}/>))
renderLoader.compact = renderComponent(() => (<Loader active inline/>))
renderLoader.strech = renderComponent(() => (
  <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Loader active inline/>
  </div>
))

export default renderLoader