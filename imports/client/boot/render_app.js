import React from 'react'
import ReactDOM from 'react-dom'

import App from '../ui/App'

export default function (history) {
  ReactDOM.render(<App history={history}/>, document.getElementById('react-root'))
}