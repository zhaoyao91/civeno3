import React from 'react'
import { Confirm } from 'semantic-ui-react'

/**
 * allow component to confirm sth to  user
 * @param confirmName
 * @param options
 * @param options.header
 * @param options.content
 * @param options.confirmButton
 * @param options.cancelButton
 * @returns HOC
 */
export default function (confirmName, options) {
  options = options || {}
  return function (Component) {
    return class ConfirmController extends React.Component {
      state = {
        open: false
      }

      _request = null

      render () {
        const {open} = this.state

        return <div>
          <Component {...this.props} {...{[confirmName]: this.confirm}}/>
          <Confirm open={open} onCancel={this.onCancel} onConfirm={this.onConfirm} header={options.header}
                   content={options.content} cancelButton={options.cancelButton} confirmButton={options.confirmButton}/>
        </div>
      }

      confirm = async () => {
        return new Promise((resolve, reject) => {
          this.setState({open: true})
          if (this._request) {
            this._request.cancelWithoutClose()
          }
          this._request = {
            confirm: () => {
              this._request = null
              resolve(true)
              this.setState({open: false})
            },
            cancel: () => {
              this._request = null
              resolve(false)
              this.setState({open: false})
            },
            cancelWithoutClose: () => {
              this._request = null
              resolve(false)
            }
          }
        })
      }

      onCancel = () => {
        if (this._request) {
          this._request.cancel()
        }
      }

      onConfirm = () => {
        if (this._request) {
          this._request.confirm()
        }
      }
    }
  }
}