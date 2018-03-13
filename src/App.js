import React, { Component } from 'react';
// import DecisionPage from './containers/DecisionPage'
import Controller from './containers/Controller'

import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import decReducer,{initialState} from './decReducer'
import mySagas from './sagas'
import createSagaMiddleware from 'redux-saga'
// import Menu from './components/Menu'



import {
  BrowserRouter,
  Route,

} from 'react-router-dom'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()


const reducers = {
  dec:decReducer
}
export const reducer = combineReducers(reducers);



export const store = createStore(
          decReducer,
          initialState,
          applyMiddleware(sagaMiddleware,loggerMiddleware)
        )


sagaMiddleware.run(mySagas)

const {NODE_ENV,PUBLIC_URL} = process.env

const urlPrefix = NODE_ENV === "production"? PUBLIC_URL:""

class App extends Component {
  render() {


    return (
      <Provider store={store}>
      <BrowserRouter>

          {/* <Route exact path = {'/table'} component = {Table}/> */}
          <Route  path = {'/'} component = {Controller}/>

          {/* <SetUpScreen/> */}

      </BrowserRouter>
  </Provider>

    )
  }
}

export default App;
