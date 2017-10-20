import React, { Component } from 'react';
import SequentialDecision1 from './containers/SequentialDecision1'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import sdReducer,{initialState} from './sdReducer'
import Menu from './components/Menu'

import {
  BrowserRouter,
  Route,

} from 'react-router-dom'

const loggerMiddleware = createLogger()

const reducers = {
  sd:sdReducer
}
export const reducer = combineReducers(reducers);



export const sdStore = createStore(
          reducer,{sd:initialState},applyMiddleware(loggerMiddleware)
        )





class App extends Component {
  render() {
    return (
      <Provider store={sdStore}>
      <BrowserRouter>
        <div>
      <Route path = '/' component = {Menu}/>


      <Route path = '/sequence1' component = {SequentialDecision1}/>

      </div>
      </BrowserRouter>
  </Provider>

    )
  }
}

export default App;
