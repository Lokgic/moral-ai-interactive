import React,{Component} from 'react'
import { connect } from 'react-redux'
import {  Divider, Dropdown, Card,Container,Header,Button} from 'semantic-ui-react'
import RandomPerson from '../components/RandomPerson'








class SequentialDecision1 extends Component {
  constructor(props){
    super(props)
    this.choice = props.currentChosen
    this.makeDecision = this.makeDecision.bind(this)
  }
  makeDecision(){
    const {currentChosen,addFeature,nextFeature,addData,person} = this.props
      console.log(nextFeature)
    if (currentChosen === "More Info"){
      addFeature(nextFeature)
    } else if (
      currentChosen===person[0].features.name){
        addData(0)
      }
      else if
        (currentChosen===person[1].features.name){
          addData(1)
        }
  }
  render(){
    const {person,
          currentChosen,
          makeSelection,
          chooseFeature,
          showingFeatures,
          availableFeatures
        } = this.props

    return (
    <div className="flex-container">

      <div className = "flex-auto-margin" style = {{width:"80%"}}>
        <Header as='h1'  >Who should receive a kidney?</Header>
      <Card.Group itemsPerRow = "2">
        <RandomPerson
         person={person[0]}
         currentChosen={currentChosen}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}


         />



        <RandomPerson
        person={person[1]}
        currentChosen={currentChosen}
        makeSelection={makeSelection}
        showingFeatures={showingFeatures}

        />

    </Card.Group>
    <Divider/>
    <Container fluid textAlign="center">
      {"To decide, I would need to know about "}
      <Dropdown
        placeholder = " select feature here"
        inline
        options={
          Object.keys(availableFeatures)
            .sort(() => Math.random() - 0.5)
            .map(d=>{
            return{
              text:availableFeatures[d],
              value:d
            }
          })
        }
        onChange = {(e,{value})=>chooseFeature(value)}

      />
      <Button animated fluid onClick={this.makeDecision}>
      <Button.Content color='green' visible>Confirm</Button.Content>
      <Button.Content hidden>
        {"Current Selection: " + currentChosen}
      </Button.Content>
    </Button>
    </Container>
    </div>
    </div>
  )}

}






const mapDispatchToProps = dispatch =>{
  return{
    makeSelection:choice=>dispatch({type:"SELECTION",choice}),
    chooseFeature:feature=>dispatch({type:"CHOOSE_FEATURE",feature})
    ,addFeature:feature=>dispatch({type:"ADD_FEATURE",feature}),
    addData:choice=>dispatch({type:"ADD_DATA",choice})

  }
}

const mapStateToProps = state =>{

  return state.sd
}

export default connect(mapStateToProps,mapDispatchToProps)(SequentialDecision1)
