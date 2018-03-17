import React, { Component } from 'react';
// import DecisionPage from './containers/DecisionPage'
import Controller from './containers/Controller'
import CsvMaker from './containers/CsvMaker'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import decReducer,{initialState} from './decReducer'
import mySagas from './sagas'
import createSagaMiddleware from 'redux-saga'
// import Menu from './components/Menu'



import {
  BrowserRouter as Router,
  Route,
  Switch

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
      <Router>
          <Switch>
          <Route exact path = '/' component = {Controller}/>
          <Route path = '/csv' component = {CsvMaker}/>
          <Route component={Controller}/>
          </Switch>

          {/* <SetUpScreen/> */}

      </Router>
  </Provider>

    )
  }
}

export default App;
