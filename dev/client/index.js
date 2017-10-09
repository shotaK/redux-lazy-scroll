import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './posts/posts.container';
import configureStore from './common/configureStore';
const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);