import React from 'react'
import {Header,Image,Table} from 'semantic-ui-react'


export default props => {
  const {person,


,
        showingFeatures,

        icons
      } = props
  return (

    <Table
      size="large"
      textAlign="center"

      >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell onClick={()=>console.log("g")}></Table.HeaderCell>
          {person.map(d => (
            <Table.HeaderCell
              key={"tableHeaderCell"+d.features.name}>
              <Header as='h4' image>
                <Image src={d.features.img}/>
              </Header>
              {d.features.name}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {["age","gender"].concat(showingFeatures).map(d=>(
          <Table.Row key={"row"+d}>
            <Table.Cell>
              <Header as = 'span' image>

                <Image>
                  {icons[d]}
                </Image>
                {d}
              </Header>

            </Table.Cell>
            {person.map((p,i)=>(
              <Table.Cell key={"cell"+i+p.features.name+d}>
              {p.features[d]}
            </Table.Cell>))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>

  )

}
