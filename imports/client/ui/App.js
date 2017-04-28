import React from 'react'
import {
  Router,
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
const ResetPasswordPage = lazyLoad(() => import('./pages/ResetPasswordPage'))

// used to hold all global components and top level routes
const App = ({history}) => (
  <div>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/forgot-password" component={ForgotPasswordPage}/>
        <Route path="/reset-password/:token" component={ResetPasswordPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
    <Alert stack={{limit: 3}} effect="slide"/>
  </div>
)

export default App