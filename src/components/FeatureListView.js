import React from 'react'
import { Button,
          Card,
          Image,
          List,
          Divider,
          Transition
        } from 'semantic-ui-react'




export default props => {
  const {
        person,
        currentChosen,
        makeSelection,
        chooseFeature,
        showingFeatures,
        availableFeatures,
        icons
      } = props

  return (
    <Card.Group itemsPerRow = "2">
      {person.map(d=>(
        <FeatureList
         person={d}
         currentChosen={currentChosen}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}
         icons={icons}

         />
      ))
    }
  </Card.Group>
  )
}


const FeatureList = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, currentChosen,showingFeatures,icons} = props


  return (


    <Card>
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
