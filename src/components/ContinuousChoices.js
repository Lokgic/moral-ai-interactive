import React,{Component} from 'react'

import {
    Label
} from 'semantic-ui-react'


export default class ContinuousChoices extends Component{
  constructor(props){
    super(props)
    this.state = {value:50}
    this.handleChange = this.handleChange.bind(this)

  }
  handleChange(event){
    const value = event.target.value
    const {makeSelection} = this.props
    this.setState({value})
    makeSelection([(100-value)/100,value/100])
  }
  render(){
    const {currentChosen,name0,name1} = this.props
    const {value} = this.state
    return (
      <div id="slidecontainer" style={{
        width:"100%"
      }}>
      <Label>
        {name0}
      </Label>
      <Label style={{float:"right"}}>
        {name1}
      </Label>
      <input type="range" min="0" max="100" value={value} className="slider" id="myRange"
        style={{
          width:"100%"
        }}
        onChange={this.handleChange}
      />

    </div>

    )
  }
}
