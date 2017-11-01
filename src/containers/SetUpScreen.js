import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button, Form, Select } from 'semantic-ui-react'

import {  Redirect } from 'react-router'



class SetUp extends Component {
  constructor(props){
    super(props)
    const {expParameters} = props
    this.validateButton = this.validateButton.bind(this)
    this.makeInitState = this.makeInitState.bind(this)

    let warning = {}
    for (let p of expParameters){
      warning[p.id] = false
    }

    this.state = {warning,next:false}

  }
  validateButton(){
    const {parms, expParameters,nextPage} = this.props
    let warning = {}
    for (let p of expParameters){
        warning[p.id] = (Object.keys(parms).indexOf(p.id) === -1)
    }
    this.setState(warning)
    if (Object.values(warning).indexOf(true)===-1) this.makeInitState()
  }
  makeInitState(){
    const {availableFeatures,parms,initialize} = this.props
    const {decType,indiff,preferenceOrdering} = parms
    let toShow,avail
    if (preferenceOrdering) {
      toShow = []
      avail = availableFeatures
    } else{
      avail = {}
      toShow =  Object.keys(availableFeatures).sort(() => Math.random() - 0.5)
    }
    initialize({showingFeatures:toShow})
    this.setState({next:true})
  }
  render(){
  const {expParameters,changeParameter,parm} = this.props
  const {state,validateButton} = this
  const {warning,next} = state
  if (next) return (<Redirect to="/decision"/>)
  return (
    <Form>
      <Form.Group>
      {
        expParameters.map((d,i)=>(
          <Form.Field key={"field_"+d.id}
                      control={Select}
                      label={d.label}
                      placeholder="Select..."
                      options={d.options}
                      onChange= {(e,{value})=>changeParameter(d.id,value)}
                      error={state[d.id]}


          />)

        )
      }
      </Form.Group>
      <Button onClick={validateButton}>Confirm</Button>
    </Form>
  )}
}




const mapDispatchToProps = dispatch => {
    return {
        changeParameter: (parm,val)=>dispatch({type:"CHANGE_PARAMETER",parm,val}),
        nextPage:()=>dispatch({type:"CHANGE_PAGE", page:"Decision"}),
        initialize:newParms=>dispatch({type:"INITALIZE",newParms})
    }
}

const mapStateToProps = state => {

    return  state.dec

}


export default connect(mapStateToProps, mapDispatchToProps)(SetUp)
