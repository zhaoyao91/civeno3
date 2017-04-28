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
const ForgotPasswordPage = lazyLoad(() => import('./pages/ForgotPasswordPage'))

// used to hold all global components and top level routes
const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/forgot-password" component={ForgotPasswordPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
    <Alert stack={{limit: 3}} effect="slide"/>
  </div>
)

export default App