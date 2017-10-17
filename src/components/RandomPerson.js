import React,{Component} from 'react'
import { Button, Card, Image, List,Divider,Icon } from 'semantic-ui-react'
import Chance from 'chance'




export default props => {
  const chance = new Chance()
  const gender = chance.gender()
  const name = chance.name({gender})
  const age = chance.age()
  const img = '/heads/'+gender+'/'+chance.integer({min:1,max:2})+'.png'

  return (


    <Card>

      <Card.Content>
        <Image
          floated="right"
          height="70px"
          src={img}/>
      <Card.Header>{name}</Card.Header>
      <Card.Description>
        <List bulleted>
          <List.Item>
            {age}
          </List.Item>
          <List.Item>
            {gender}
          </List.Item>
        </List>

      </Card.Description>
      <Divider />
      <Button animated fluid>
      <Button.Content basic color='green' visible>Choose</Button.Content>
      <Button.Content hidden>
        {name + " should receive the kidney."}
      </Button.Content>
    </Button>
        </Card.Content>
    </Card>

)}
