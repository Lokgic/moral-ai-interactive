import React from 'react'
import {Table, Header, Image, Icon} from "semantic-ui-react"


const order = ["name","age","gender","health","exercising","drinking","chosen"]
export default props =>{
  const {hit,miss,featurePreference} = props
   let data = hit.map((d,i)=>{
    d.chosen = true
    return d
  })
   data = data.concat(miss.map((d,i)=>{
    d.chosen = false
    return d
  }))
  data.sort((a,b)=>a.name.split()[1] > b.name.split()[1])
  console.log(data)
  return (
    <Table color = "brown">
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Age</Table.HeaderCell>
        <Table.HeaderCell>Gender</Table.HeaderCell>
        <Table.HeaderCell>Health</Table.HeaderCell>
        <Table.HeaderCell>Exercising</Table.HeaderCell>
        <Table.HeaderCell>Drinking</Table.HeaderCell>
        <Table.HeaderCell>Chosen</Table.HeaderCell>
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
                </Header>):
                    d==="chosen"?
                      row[d]?<Icon name='checkmark'/>
                      :<Icon name='close'/>

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
