import React, { Component } from 'react';

import SequentialDecision1 from './containers/SequentialDecision1'

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import Menu from './components/Menu'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
      <Route exact path = '/' component = {Menu}/>
      <Route path = '/sequence1' component = {SequentialDecision1}/>
      </div>
      </BrowserRouter>

    )
  }
}

export default App;
