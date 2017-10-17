import React from 'react'
import {  Grid,Divider, Dropdown} from 'semantic-ui-react'


import RandomPerson from '../components/RandomPerson'



const infoOptions = [
  "A", "B"
]
export default props => (
  <div className="flex-container">
    <div className = "flex-auto-margin">
  <Grid columns={2} relaxed >
    <Grid.Column>
      <RandomPerson/>
    </Grid.Column>

    <Grid.Column>
      <RandomPerson/>
    </Grid.Column>
  </Grid>
  <Divider/>
  <Dropdown placeholder = "Find out more information about the candidates" fluid selection options={infoOptions}/>
  </div>
  </div>
)
