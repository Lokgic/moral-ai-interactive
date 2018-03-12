import React, { Component } from 'react';
// import DecisionPage from './containers/DecisionPage'
import Controller from './containers/Controller'

import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import decReducer,{initialState} from './decReducer'

// import Menu from './components/Menu'

import {
  BrowserRouter,
  Route,

} from 'react-router-dom'

const loggerMiddleware = createLogger()

const reducers = {
  dec:decReducer
}
export const reducer = combineReducers(reducers);



export const sdStore = createStore(
          decReducer,initialState,applyMiddleware(loggerMiddleware)
        )



const {NODE_ENV,PUBLIC_URL} = process.env

const urlPrefix = NODE_ENV === "production"? PUBLIC_URL:""
class App extends Component {
  render() {


    return (
      <Provider store={sdStore}>
      <BrowserRouter>
        <div>

          {/* <Route exact path = {'/setup'} component = {SetUpScreen}/> */}
          <Route path = {'/'} component = {Controller}/>

          {/* <SetUpScreen/> */}
      </div>
      </BrowserRouter>
  </Provider>

    )
  }
}

export default App;
