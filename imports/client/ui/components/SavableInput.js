import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { renameProps, setPropTypes, compose, withState, withHandlers, withProps, defaultProps } from 'recompose'
import PropTypes from 'prop-types'

import withToggleState from '../hocs/with_toggle_state'

const SavableInput = compose(
  setPropTypes({
    label: PropTypes.string,
    value: PropTypes.string,
    save: PropTypes.func, // func(newValue)
    saving: PropTypes.bool,
    style: PropTypes.object,
    // only allow value related component
    as: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ]),
    controlProps: PropTypes.object,
  }),
  defaultProps({
    as: Input
  }),
  renameProps({
    as: 'Control',
    value: 'actualValue',
    saving: 'loading',
  }),
  withState('value', 'setValue', ({actualValue}) => actualValue),
  withHandlers({
    onValueChange: ({setValue}) => e => setValue(e.target.value),
    onSubmit: ({save, value}) => e => {
      e.preventDefault()
      save(value)
    },
    onReset: ({actualValue, setValue}) => () => setValue(actualValue),
  }),
  withToggleState('focused', 'focus', 'blur', false),
  withProps(({value, actualValue}) => ({
    valueDirty: value !== actualValue
  })),
  withProps(({valueDirty, focused}) => ({
    displayActions: valueDirty || focused,
    disableActions: !valueDirty,
  }))
)(({label, Control, value, onValueChange, onSubmit, onReset, loading, style, displayActions, disableActions, focus, blur, controlProps}) => (
  <Form style={style} loading={loading} onSubmit={onSubmit}>
    <Form.Field>
      <label>{label}</label>
      <Control {...controlProps} value={value} onChange={onValueChange} onFocus={focus} onBlur={blur}/>
    </Form.Field>
    {
      displayActions && <div>
        <Button primary type="submit" disabled={disableActions}>保存</Button>
        <Button onClick={onReset} type="button" disabled={disableActions}>重置</Button>
      </div>
    }
  </Form>
))

export default SavableInput