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
const FlowPage = requireAuth(lazyLoad(() => import('./pages/FlowPage')))
const FlowDefinitionPage = requireAuth(lazyLoad(() => import('./pages/FlowDefinitionPage')))
const FlowInstancesPage = requireAuth(lazyLoad(() => import('./pages/FlowInstancesPage')))
const FlowDataPage = requireAuth(lazyLoad(() => import('./pages/FlowDataPage')))
const FlowApplicationsPage = requireAuth(lazyLoad(() => import('./pages/FlowApplicationsPage')))
const UserCenterPage = requireAuth(lazyLoad(() => import('./pages/UserCenterPage')))
const MyProfilePage = requireAuth(lazyLoad(() => import('./pages/MyProfilePage')))

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
        <Route exact path="/user-center" component={UserCenterPage}/>
        <Route exact path="/my/profile" component={MyProfilePage}/>
        <Route exact path="/flows" component={FlowsPage}/>
        <Route exact path="/flow/:flowId" component={FlowPage}/>
        <Route exact path="/flow/:flowId/definition" component={FlowDefinitionPage}/>
        <Route exact path="/flow/:flowId/instances" component={FlowInstancesPage}/>
        <Route exact path="/flow/:flowId/data" component={FlowDataPage}/>
        <Route exact path="/flow/:flowId/applications" component={FlowApplicationsPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
    <Alert stack={{limit: 3}} effect="slide"/>
  </div>
)

export default App