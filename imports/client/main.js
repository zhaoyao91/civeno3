import createBrowserHistory from 'history/createBrowserHistory'

import promisifyApis from './boot/promisify_apis'
import renderApp from './boot/render_app'
import configAccounts from './boot/config_accounts'

const history = createBrowserHistory()

promisifyApis()
configAccounts(history)
renderApp(history)