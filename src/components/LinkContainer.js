import React from 'react'
import {Item} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom'

export default props =>{


  const item = (<Item link={props.external? true: false} href={props.external? props.url:""}>

    <Item.Image size = "small" src = {props.img}/>
    <Item.Content verticalAlign='middle'>
    <Item.Header>{props.title}</Item.Header>
    <Item.Description>{props.description}</Item.Description>
  </Item.Content>
  </Item>
  )
  if (props.external) return item
  else return (
    <Link to = {props.url}>{item} </Link>)
}
