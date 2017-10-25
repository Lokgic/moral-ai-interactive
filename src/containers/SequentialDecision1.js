import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Divider,
    Dropdown,
    Card,
    Container,
    Header,
    Button
} from 'semantic-ui-react'
import FeatureListView from '../components/FeatureListView'
import TableView from '../components/TableView'
import DataView from '../components/DataView'

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

class SequentialDecision1 extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen
        this.makeDecision = this.makeDecision.bind(this)
    }
    makeDecision() {
        const {currentChosen, addFeature, nextFeature, addData, person} = this.props

        if (currentChosen === "More Info") {
            addFeature(nextFeature)
        } else if (currentChosen === person[0].features.name) {
            addData(0)
        } else if (currentChosen === person[1].features.name) {
            addData(1)
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
            displayMode,
            changeDisplay,
            hit,
            miss,
            featurePreference
        } = this.props
        const name0 = person[0].features.name
        const name1 = person[1].features.name
        let view
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
          view = (<DataView hit={hit} miss={miss} featurePreference={featurePreference}/>)
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
                    <Button.Group fluid>

                        <Button color={currentChosen === name0
                            ? "teal"
                            : "grey"} onClick={() => makeSelection(name0)}>
                            {name0}
                        </Button>
                        <Button.Or/>
                        <Button color={currentChosen === name1
                            ? "teal"
                            : "grey"} onClick={() => makeSelection(name1)}>
                            {name1}
                        </Button>
                        <Button.Or/>
                        <Button color={currentChosen === "More Info"
                            ? "orange"
                            : "grey"} onClick={() => makeSelection("More Info")}>{"I need to know about "}
                            <Dropdown placeholder=" select feature here" inline options={Object.keys(availableFeatures).sort(() => Math.random() - 0.5).map(d => {
                                return {text: availableFeatures[d], value: d}
                            })} onChange= {(e,{value})=>chooseFeature(value)}/>
                        </Button>
                    </Button.Group>
                    <Divider/>
                    <Container fluid textAlign="center">

                        <Button animated fluid onClick={this.makeDecision}>
                            <Button.Content color='green' visible>Confirm</Button.Content>
                            <Button.Content hidden>
                                {"Current Selection: " + currentChosen}
                            </Button.Content>
                        </Button>
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
        addData: choice => dispatch({type: "ADD_DATA", choice}),
        changeDisplay: displayMode => dispatch({type: "CHANGE_DISPLAY", displayMode})

    }
}

const mapStateToProps = state => {

    return state.sd
}

export default connect(mapStateToProps, mapDispatchToProps)(SequentialDecision1)
