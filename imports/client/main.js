import createBrowserHistory from 'history/createBrowserHistory'

import renderApp from './boot/render_app'
import configAccounts from './boot/config_accounts'

const history = createBrowserHistory()

configAccounts(history)
renderApp(history)
