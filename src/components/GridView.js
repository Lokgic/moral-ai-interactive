import React from 'react'
import {Header,Image,Grid,Segment} from 'semantic-ui-react'
import {iconList as icons, translationList,featureList} from '../DilemmaMaker'


export default( {person, showingFeatures}) =>(
  <Grid columns={3} >
    <Grid.Row style={{padding:0}} stretched>
        <Grid.Column></Grid.Column>
        {person.map(d=>(
          <Grid.Column key={"header"+d.features.name}>
            <Header as='h4' image>
              <Image src={d.features.img}/>
            </Header>
            {d.features.name}
          </Grid.Column>
        ))}
    </Grid.Row>
    {
      ["age","gender"].concat(showingFeatures).map(d=>(
        <Grid.Row key={"row"+d}>
          <Grid.Column stretched>
            <Header as = 'span' image>
              <Image>
                {icons[d]}
              </Image>
              {featureList[d]}
            </Header>
          </Grid.Column>
          {person.map((p,i)=>(
            <Grid.Column stretched key={"cell"+i+p.features.name+d}>
{translationList[d](p.features[d])}
          </Grid.Column>))}
        </Grid.Row>
      ))
    }
  </Grid>
)
