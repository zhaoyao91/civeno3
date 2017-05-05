import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { setPropTypes, compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'

import withToggleState from '../hocs/with_toggle_state'

const FormModal = compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    submit: PropTypes.func, // async func()
    header: PropTypes.string,
  }),
  withToggleState('submitting', 'startSubmitting', 'finishSubmitting', false),
  withHandlers({
    onSubmit: ({submit, startSubmitting, finishSubmitting}) => e => {
      e.preventDefault()
      startSubmitting()
      submit()
        .catch(err => console.error(err))
        .then(finishSubmitting)
    }
  })
)(({children, trigger, open, onOpen, onClose, onSubmit, submit, submitting, header}) => (
  <Modal size="small" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} closeIcon='close'>
    <Modal.Header content={header}/>
    <Modal.Content>
      <Form loading={submitting} onSubmit={onSubmit}>
        {children}
        <Button style={{display: 'none'}}/>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>返回</Button>
      <Button primary onClick={submit}>确认</Button>
    </Modal.Actions>
  </Modal>
))

export default FormModal