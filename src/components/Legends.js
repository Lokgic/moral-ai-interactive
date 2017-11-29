import React, { Component } from 'react'
import { Accordion, Label, Icon, List } from 'semantic-ui-react'

import {iconList as icons, translationList,featureList} from '../DilemmaMaker'

// const items = Object.keys(featureList).map((d,i)=>{
//   return {
//     childKey:i,
//     image:icons[d],
//     header:featureList[d]
//   }
// })

const items = (
  <List>
    {
      Object.keys(featureList).map((d,i)=>(
      <List.Item key = {"legend" + i}>
        <Label horizontal>
          {icons[d]}
        </Label>
        {featureList[d]}
      </List.Item>
    )
  )
  }
  </List>
)





export default class Legends extends Component{
  state = {active:1}
  handleClick = ()=>{
    this.setState({active:1 - this.state.active})
  }
  render(){
    const {active} = this.state
    return (
      <Accordion style={{position:'absolute'}}>
        <Accordion.Title active={active} onClick={this.handleClick}>
          <Icon name='dropdown' /> {<Icon name="question"/>}
        </Accordion.Title>
        <Accordion.Content active={active}>
          {/* <Item.Group items= {items}/> */}
          {items}
        </Accordion.Content>
      </Accordion>
    )
  }
}
