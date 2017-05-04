import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import { assoc } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Accounts } from 'meteor/accounts-base'

export default compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }),
  withState('oldPassword', 'setOldPassword', ''),
  withState('newPassword', 'setNewPassword', ''),
  withHandlers({
    onOldPasswordChange: ({setOldPassword}) => e => setOldPassword(e.target.value),
    onNewPasswordChange: ({setNewPassword}) => e => setNewPassword(e.target.value),
    resetForm: ({setOldPassword, setNewPassword}) => () => {
      setOldPassword('')
      setNewPassword('')
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.open !== nextProps.open) {
        this.props.resetForm()
      }
    }
  }),
  withState('submitting', 'setSubmitting', false),
  withHandlers({
    onUpdatePassword: ({oldPassword, newPassword, setSubmitting, onClose}) => () => {
      if (!oldPassword) {
        return Alert.error('请如输入旧密码')
      } else if (!newPassword) {
        return Alert.error('请输入新密码')
      }

      setSubmitting(true)
      Accounts.changePassword(oldPassword, newPassword, (err) => {
        setSubmitting(false)
        if (err) {
          console.error(err)
          if (err.reason === 'Incorrect password') {
            Alert.error('密码错误')
          } else {
            Alert.error('密码修改失败')
          }
        } else {
          Alert.success('密码修改成功')
          onClose()
        }
      })
    }
  }),
  withHandlers({
    onSubmit: ({onUpdatePassword}) => e => {
      e.preventDefault()
      onUpdatePassword()
    }
  })
)(({trigger, open, onOpen, onClose, oldPassword, onOldPasswordChange, newPassword, onNewPasswordChange, onSubmit, onUpdatePassword, submitting}) => (
  <Modal size="small" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} closeIcon='close'>
    <Modal.Header content='修改密码'/>
    <Modal.Content>
      <Form loading={submitting} onSubmit={onSubmit}>
        <Form.Input type="password" required label="旧密码" value={oldPassword} onChange={onOldPasswordChange}/>
        <Form.Input type="password" required label="新密码" value={newPassword} onChange={onNewPasswordChange}/>
        <Button style={{display: 'none'}}>提交</Button>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>返回</Button>
      <Button primary onClick={onUpdatePassword}>确认</Button>
    </Modal.Actions>
  </Modal>
))