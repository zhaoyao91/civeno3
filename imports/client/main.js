import createBrowserHistory from 'history/createBrowserHistory'

import renderApp from './boot/render_app'
import configAccounts from './boot/config_accounts'
import importStyles from './boot/import_styles'

importStyles()

const history = createBrowserHistory()

configAccounts(history)
renderApp(history)
