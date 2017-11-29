import React from 'react'
import {
          Card,
          Image,
          List,
          Icon,
          Button,
          Transition,
          Loader
        } from 'semantic-ui-react'

import {iconList as icons, translationList,featureList} from '../DilemmaMaker'



export default props => {
  const {
        person,
        currentChosen,
        makeSelection,

        showingFeatures,

        icons
      } = props

  return (
    <Card.Group itemsPerRow = "2" stackable>
      {person.map((d,i)=>(
        <PersonCard
         person={d}
         chosen={currentChosen[i]}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}
         key={"personcard"+i}
         loc={i}
         />
      ))
    }
  </Card.Group>
  )
}



const PersonCard = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, chosen,showingFeatures,loc} = props

  return (


    <Card style={{backgroundColor: 'rgb(207, 210, 216)'}}>
      <Card.Content>
        <Image
          floated="right"
          height="70px"
          ><Icon
            name="user circle"
            size="huge"
          /></Image>
      <Card.Header>{name}</Card.Header>
      <Card.Description>
        <List
          divided
          size='big'
          verticalAlign='middle'
          >

          {["age"].concat(showingFeatures).map((d,i)=>(

            <List.Item key = {d}>
              <Image avatar>{icons[d]}</Image>
              <List.Content>
                {translationList[d](features[d])}
              </List.Content>
            </List.Item>
          ))}
        </List>




      </Card.Description>

        </Card.Content>
    </Card>

)}
