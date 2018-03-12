import React, {Component} from 'react'
import {connect} from 'react-redux'
import DecisionPage from './DecisionPage'
// import DataViz from './DataViz'


const Controller = ({labels, n_trials}) => {
  // const isDone = !(labels.length < n_trials)
  const isDone = false
  // if (isDone) return (<DataViz/>)
     return (<DecisionPage/>)
}





const mapStateToProps = ({labels, n_trials}) => {
    return {labels, n_trials}
}

export default connect(mapStateToProps)(Controller)
