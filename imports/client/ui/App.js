import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import lazyLoad from './lib/lazy_load'

const IndexPage = lazyLoad(() => import('./pages/IndexPage'))
const SignupPage = lazyLoad(() => import('./pages/SignupPage'))
const NotFoundPage = lazyLoad(() => import('./pages/NotFoundPage'))

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  </div>
)

export default App