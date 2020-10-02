import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './store/providers/root-reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



const store = createStore(
rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
  )
)
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
