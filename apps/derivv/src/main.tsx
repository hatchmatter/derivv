import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { unregister } from './registerServiceWorker'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

import store from './store'
import App from './App'

Bugsnag.start({
  apiKey: import.meta.env.VITE_BUGSNAG_API_KEY!,
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
const target = document.querySelector('#root')

class ErrorView extends React.Component {
  render() {
    return <div>Sorry! Something went wrong and I'm looking into it. Please refresh the page and try again. If you need support, please send me a message: <a href='https://twitter.com/levivoelz' target='_blank'>@levivoelz</a>.</div>
  }
}

render(
  <ErrorBoundary FallbackComponent={ErrorView}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  target
)

unregister()
