import React from 'react'
import {Table, Header, Image, Icon} from "semantic-ui-react"


const order = ["trial","name","age","gender","health","exercising","drinking","label","random"]
export default props =>{
  const {features,featurePreference,labels,randomChoices} = props
  //  let data = hit.map((d,i)=>{
  //   d.chosen = true
  //   return d
  // })
  //  data = data.concat(miss.map((d,i)=>{
  //   d.chosen = false
  //   return d
  // }))
  const data = features.reduce((arr,d,i)=>{
    const temp = [0,1].map(j=>{
      d[j].label = labels[i][j]
      d[j].trial = i
      d[j].random = randomChoices[i]
      return d[j]
    })

    return arr.concat(temp)
  },[])



  return (
    <Table color = "brown">
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Trial</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Age</Table.HeaderCell>
        <Table.HeaderCell>Gender</Table.HeaderCell>
        <Table.HeaderCell>Health</Table.HeaderCell>
        <Table.HeaderCell>Exercising</Table.HeaderCell>
        <Table.HeaderCell>Drinking</Table.HeaderCell>
        <Table.HeaderCell>Label</Table.HeaderCell>
        <Table.HeaderCell>Random</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row,i)=>(
          <Table.Row key={"datarow"+i}>

            {order.map((d,j)=>(
              <Table.Cell key={"cell"+i+j}>
                {
                  d==="name"?
                  (<Header as='h4' image>
                  <Image src={row.img}/>
                </Header>)
                    :null
                  }
                  {row[d]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
