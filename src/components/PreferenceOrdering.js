import React from 'react'
import { Form,Label } from 'semantic-ui-react'


export default props =>{
  const {availableFeatures,nextFeature,chooseFeature,icons} = props
  return (
        <Form.Group inline>
          <label>Request more information</label>
          {
            Object.keys(availableFeatures)
            .map(d=>(
              <Form.Radio
                label={availableFeatures[d]}
                value={d}
                checked={nextFeature === d}
                onChange={(a,{value})=>chooseFeature(value)}
              />




            ))
          }

        </Form.Group>)
}
