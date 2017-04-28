import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Alert from 'react-s-alert'

import lazyLoad from './lib/lazy_load'

const NotFoundPage = lazyLoad(() => import('./pages/NotFoundPage'))
const IndexPage = lazyLoad(() => import('./pages/IndexPage'))
const SignupPage = lazyLoad(() => import('./pages/SignupPage'))
const LoginPage = lazyLoad(() => import('./pages/LoginPage'))

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
    <Alert stack={{limit: 3}} effect="slide"/>
  </div>
)

export default App