import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import IndexPage from './pages/IndexPage'

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <Route exact path="/" component={IndexPage}/>
    </Router>
  </div>
)

export default App