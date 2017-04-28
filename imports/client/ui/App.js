import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import lazyLoad from './lib/lazy_load'

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={lazyLoad(() => import('./pages/IndexPage'))}/>
        <Route exact path="/signup" component={lazyLoad(() => import('./pages/SignupPage'))}/>
        <Route component={lazyLoad(() => import('./pages/NotFoundPage'))}/>
      </Switch>
    </Router>
  </div>
)

export default App