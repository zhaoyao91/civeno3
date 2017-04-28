import React from 'react'
import ReactDOM from 'react-dom'

import App from './ui/App'

// import semantic styles
import 'semantic-ui-css/semantic.min.css'

// import s-alert styles
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

// render react app
ReactDOM.render(<App/>, document.getElementById('react-root'))