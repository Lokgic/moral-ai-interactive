import React from 'react'
import {
          Card,
          Image,
          List
        } from 'semantic-ui-react'




export default props => {
  const {
        person,
        currentChosen,
        makeSelection,

        showingFeatures,

        icons
      } = props

  return (
    <Card.Group itemsPerRow = "2">
      {person.map((d,i)=>(
        <FeatureList
         person={d}
         chosen={currentChosen[i]}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}
         icons={icons}
         key={"personcard"+i}
         />
      ))
    }
  </Card.Group>
  )
}


const FeatureList = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, chosen,showingFeatures,icons} = props
  let color
  if (chosen > 0.5)  color = "rgba(95, 178, 180," +chosen+")"
  else if (chosen === 0)  color = "white"
  else if (chosen < 0.5)  color = "rgba(175, 98, 140," +chosen+")"

  return (


    <Card style={{backgroundColor:color}}>
      <Card.Content>
        <Image
          floated="right"
          height="70px"
          src={img}/>
      <Card.Header>{name}</Card.Header>
      <Card.Description>
        <List

          duration={200}
          divided
          size='huge'
          verticalAlign='middle'
          >

          {["age","gender"].concat(showingFeatures).map((d,i)=>(

            <List.Item key = {d}>
              <Image avatar>{icons[d]}</Image>
              <List.Content>
                {d+": " + features[d]}
              </List.Content>
            </List.Item>
          ))}
        </List>




      </Card.Description>

        </Card.Content>
    </Card>

)}
