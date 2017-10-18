import React from 'react'
import { Button, Card, Image, List,Divider } from 'semantic-ui-react'





export default props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, currentChosen,showingFeatures} = props

  //
  // const gender = chance.gender()
  // const name = chance.name({gender})
  // const age = chance.age()
  // const img = '/heads/'+gender+'/'+chance.integer({min:1,max:2})+'.png'

  return (


    <Card raised = {currentChosen===name}>
      <Card.Content>
        <Image
          floated="right"
          height="70px"
          src={img}/>
      <Card.Header>{name}</Card.Header>
      <Card.Description>
        <List bulleted>
          <List.Item>
            {"Age :" +age}
          </List.Item>
          <List.Item>
            {gender}
          </List.Item>
          {showingFeatures.map((d,i)=>(
            <List.Item key = {d}>
              {d+" :" + features[d]}
            </List.Item>
          ))}
        </List>

      </Card.Description>
      <Divider />
      <Button color='green' animated fluid onClick={()=>makeSelection(name)}>
      <Button.Content  visible>Choose</Button.Content>
      <Button.Content hidden>
        {name + " should receive the kidney."}
      </Button.Content>
    </Button>
        </Card.Content>
    </Card>

)}
