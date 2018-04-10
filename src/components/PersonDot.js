import React,{Component} from 'react'


export default class PersonDot extends Component{
  state = {showInfo:false}
  render(){
    const {x,y, r, subject} = this.props
    return(
      <circle cx={x} cy={y} r={r} fill={subject.label===1? "blue":"red"}
      />

      </circle>
    )
  }
}
