import React from 'react'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'
import Alert from 'react-s-alert'

import requireAuth from './hocs/require_auth'

const TestPage = require('./pages/TestPage').default
const NotFoundPage = require('./pages/NotFoundPage').default
const IndexPage = require('./pages/IndexPage').default
const SignupPage = require('./pages/SignupPage').default
const LoginPage = require('./pages/LoginPage').default
const ForgotPasswordPage = require('./pages/ForgotPasswordPage').default
const ResetPasswordPage = require('./pages/ResetPasswordPage').default
const FlowsPage = requireAuth(require('./pages/FlowsPage').default)
const FlowPage = requireAuth(require('./pages/FlowPage').default)
const FlowDefinitionPage = requireAuth(require('./pages/FlowDefinitionPage').default)
const FlowInstancesPage = requireAuth(require('./pages/FlowInstancesPage').default)
const FlowDataPage = requireAuth(require('./pages/FlowDataPage').default)
const FlowApplicationsPage = requireAuth(require('./pages/FlowApplicationsPage').default)
const UserCenterPage = requireAuth(require('./pages/UserCenterPage').default)
const MyProfilePage = requireAuth(require('./pages/MyProfilePage').default)

// used to hold all global components and top level routes
const App = ({history}) => (
  <div>
    <Router history={history}>
      <Switch>
        <Route exact path="/test" component={TestPage}/>
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