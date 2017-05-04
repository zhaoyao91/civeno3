import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import PropTypes from 'prop-types'

const FormModal = compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    submit: PropTypes.func,
    submitting: PropTypes.bool,
    header: PropTypes.string,
  }),
  withHandlers({
    onSubmit: ({submit}) => e => {
      e.preventDefault()
      submit()
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