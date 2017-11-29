import React from 'react'
import { Progress, Segment } from 'semantic-ui-react'


export default ({percent}) => (
  <Segment inverted>
    <Progress percent={percent} inverted color="brown"/>
  </Segment>
)
