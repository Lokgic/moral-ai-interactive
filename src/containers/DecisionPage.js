import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Divider,
    Dropdown,
    Card,
    Container,
    Header,
    Button,
    Label
} from 'semantic-ui-react'
import FeatureListView from '../components/FeatureListView'
import TableView from '../components/TableView'
import DataView from '../components/DataView'
import PreferenceOrdering from '../components/PreferenceOrdering'
import {  Redirect } from 'react-router'
import DiscreteChoices from '../components/DiscreteChoices'
import ContinuousChoices from '../components/ContinuousChoices'


import DataIcon from 'react-icons/lib/fa/database'
import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import GenderIcon from 'react-icons/lib/fa/transgender-alt'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'
import TableIcon from 'react-icons/lib/fa/table'
import ListIcon from 'react-icons/lib/fa/list'
const icons = {
    age: (<CakeIcon/>),
    gender: <GenderIcon/>,
    health: <HealthIcon/>,
    exercising: <RunnerIcon/>,
    children: <ChildIcon/>,
    drinking: <DrinkIcon/>
}

class DecisionPage extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen
        this.makeDecision = this.makeDecision.bind(this)
        this.beIndfferent = this.beIndfferent.bind(this)


    }
    beIndfferent(){
      let choice = [0,0]
      choice[Math.floor(Math.random() * 2)] = 1
      this.props.addData(choice,1)
    }
    makeDecision() {
        const {currentChosen, addFeature, nextFeature, addData, person} = this.props

        if (currentChosen === "none"){

        }
        else if (currentChosen === "More Info") {
            addFeature(nextFeature)
        } else {
          addData(currentChosen)
        }
    }
    render() {
        const {
            person,
            currentChosen,
            makeSelection,
            chooseFeature,
            showingFeatures,
            availableFeatures,
            nextFeature,
            displayMode,
            changeDisplay,
            featurePreference,
            features,
            labels,
            parms,
            randomChoices
        } = this.props
        const name0 = person[0].features.name
        const name1 = person[1].features.name
        let view
        if (Object.keys(parms).length === 0) return (<Redirect to="/"/>)
        const {decType,indiff,preferenceOrdering} = parms



        if (displayMode === "FeatureListView") {
            view = (<FeatureListView person={person}
                                    currentChosen={currentChosen}
                                    makeSelection={makeSelection}
                                    showingFeatures={showingFeatures}
                                    availableFeatures={availableFeatures}
                                    icons={icons}/>)
        } else if (displayMode === "TableView") {
            view = (<TableView person={person} currentChosen={currentChosen} makeSelection={makeSelection} showingFeatures={showingFeatures} availableFeatures={availableFeatures} icons={icons}/>)
        } else if (displayMode === "DataView") {
          view = (<DataView features={features} featurePreference={featurePreference} labels={labels}
          randomChoices={randomChoices}

          />)
        }
        return (
            <div className="flex-container">

                <div className="flex-auto-margin" style={{
                    width: "80%"
                }}>

                    <Header as='h1'>
                        Who should receive a kidney?
                        <Button.Group floated="right">
                            <Button animated='vertical' onClick={() => changeDisplay("FeatureListView")}>
                                <Button.Content visible><ListIcon/></Button.Content>
                                <Button.Content hidden>List</Button.Content>
                            </Button>
                            <Button animated='vertical' onClick={() => changeDisplay("TableView")}>
                                <Button.Content visible><TableIcon/></Button.Content>
                                <Button.Content hidden>Table</Button.Content>
                            </Button>
                            <Button animated='vertical' onClick={() => changeDisplay("DataView")}>
                                <Button.Content visible><DataIcon/></Button.Content>
                                <Button.Content hidden>Data</Button.Content>
                            </Button>
                        </Button.Group>
                    </Header>
                    {view}
                    <Divider/>

                    {
                      decType === "discrete"? <DiscreteChoices
                        currentChosen={currentChosen}
                        name0={name0}
                        name1={name1}
                        makeSelection={makeSelection}
                      />:<ContinuousChoices
                        currentChosen={currentChosen}
                        name0={name0}
                        name1={name1}
                        makeSelection={makeSelection}
                      />
                    }


                    <Divider/>
                    <Container fluid textAlign="center">
                      <Button.Group fluid>
                        <Button animated  onClick={this.makeDecision}>
                            <Button.Content color='green' visible>Decide</Button.Content>
                            <Button.Content hidden>
                                {currentChosen === "none"? "Please make your decision":"Confirm decision"}
                            </Button.Content>
                        </Button>

                        {
                          indiff?(<Button.Or/>):null
                        }
                        {
                          indiff?
                            (<Button animated  onClick={this.beIndfferent}>
                                <Button.Content color='green' visible>Indifference</Button.Content>
                                <Button.Content hidden>
                                    {"A Choice will be made randomly"}
                                </Button.Content>
                            </Button>): null
                        }

                      </Button.Group>


                      {
                        preferenceOrdering? <PreferenceOrdering
                            availableFeatures={availableFeatures}
                            nextFeature={nextFeature}
                            chooseFeature={chooseFeature}
                            icons={icons}
                        />:null
                      }
                    </Container>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        makeSelection: choice => dispatch({type: "SELECTION", choice}),
        chooseFeature: feature => dispatch({type: "CHOOSE_FEATURE", feature}),
        addFeature: feature => dispatch({type: "ADD_FEATURE", feature}),
        addData: (data,random=0) => dispatch({type: "ADD_DATA", data,random}),
        changeDisplay: displayMode => dispatch({type: "CHANGE_DISPLAY", displayMode})

    }
}

const mapStateToProps = state => {

    return state.dec
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionPage)
