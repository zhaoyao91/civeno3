import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import AccountPageLayout from '../layouts/AccountPageLayout'

const SignupPage = () => (
  <AccountPageLayout>
    <Segment style={{minWidth: '18em'}}>
      <div style={{marginBottom: '1em'}}>
        <SignupForm/>
      </div>
      <Links/>
    </Segment>
  </AccountPageLayout>
)

export default SignupPage

const SignupForm = () => (
  <Form>
    <Form.Input label="邮箱"/>
    <Form.Input type="password" label="密码"/>
    <Button fluid primary type="submit">注册</Button>
  </Form>
)

const Links = () => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link to="/login">前往登录</Link>
    <Link to="/forgot-password">找回密码</Link>
  </div>
)