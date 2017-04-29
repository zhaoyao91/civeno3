import React from 'react'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'
import Alert from 'react-s-alert'

import lazyLoad from './lib/lazy_load'
import requireAuth from './hocs/require_auth'

const NotFoundPage = lazyLoad(() => import('./pages/NotFoundPage'))
const IndexPage = lazyLoad(() => import('./pages/IndexPage'))
const SignupPage = lazyLoad(() => import('./pages/SignupPage'))
const LoginPage = lazyLoad(() => import('./pages/LoginPage'))
const ForgotPasswordPage = lazyLoad(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazyLoad(() => import('./pages/ResetPasswordPage'))
const FlowsPage = requireAuth(lazyLoad(() => import('./pages/FlowsPage')))

// used to hold all global components and top level routes
const App = ({history}) => (
  <div>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/forgot-password" component={ForgotPasswordPage}/>
        <Route exact path="/reset-password/:token" component={ResetPasswordPage}/>
        <Route exact path="/flows" component={FlowsPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
    <Alert stack={{limit: 3}} effect="slide"/>
  </div>
)

export default App