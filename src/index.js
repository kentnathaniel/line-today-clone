import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './store/reducers'
import './index.scss';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const store = createStore(reducers, applyMiddleware(thunk))

const Index = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/' component={App}></Route>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Index></Index>, document.getElementById('root'));