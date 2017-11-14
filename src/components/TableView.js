import React from 'react'
import {Header,Image,Table,Button} from 'semantic-ui-react'
import {iconList as icons, translationList,featureList} from '../DilemmaMaker'
import QMark from 'react-icons/lib/go/question'

export default ({person,
      showingFeatures,
      makeSelection
    }) =>  (

    <Table

      // textAlign="center"
      compact
      definition
      >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          {person.map((d,i)=> (
            <Table.HeaderCell
               textAlign='center'
              key={"tableHeaderCell"+d.features.name}>
              <Header as='h4' image>
                <Image src={d.features.img}/>
                <Header.Content>
                  {d.features.name}
                  <Header.Subheader>{"Patient "+ (i+1)}</Header.Subheader>
                </Header.Content>
              </Header>

            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {["age","gender"].concat(showingFeatures).map(d=>(
          <Table.Row key={"row"+d}>
            <Table.Cell  width={5}>
              <Header as = 'span' image>

                <Image>
                  {icons[d]}
                </Image>
                {featureList[d]}
              </Header>

            </Table.Cell>
            {person.map((p,i)=>(
              <Table.Cell textAlign='center'
                key={"cell"+i+p.features.name+d}>
            {translationList[d](p.features[d])}
            </Table.Cell>))}
          </Table.Row>
        ))}

        <Table.Row>
          <Table.Cell  width={5}>
            <Header as = 'span' image>
              <Image>
                <QMark/>
              </Image>
              you choose...
            </Header>

          </Table.Cell>
          {person.map((p,i)=>(
            <Table.Cell textAlign='center'
              key={"choose"+i+p.features.name}>
              {/* <Button onClick={()=>makeSelection(i)}>{"Choose Patient "+(1+i)}</Button> */}
              <Button animated fluid onClick={()=>makeSelection(i)}>
                  <Button.Content visible>{"Choose Patient "+(1+i)}</Button.Content>
                  <Button.Content hidden>
                      {p.features.name + " should receive a kidney."}
                  </Button.Content>
              </Button>
          </Table.Cell>))}

        </Table.Row>
      </Table.Body>

    </Table>

  )
