import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import lazyLoad from './lib/lazy_load'

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={lazyLoad(() => import('./pages/IndexPage'))}/>
      </div>
    </Router>
  </div>
)

export default App