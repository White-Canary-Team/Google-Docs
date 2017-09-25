import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import store from './utils/store.js'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'


ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>, document.getElementById('root'));
