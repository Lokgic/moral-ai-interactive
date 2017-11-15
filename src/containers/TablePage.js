import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Divider,
    Dropdown,
    Card,
    Container,
    Header,
    Button,
    Label,
    Icon

} from 'semantic-ui-react'

import TableView from '../components/TableView'
import DataView from '../components/DataView'
import SummaryView from '../components/SummaryView'
import PreferenceOrdering from '../components/PreferenceOrdering'
import {  Redirect } from 'react-router'

import {iconList as icons} from '../DilemmaMaker'
import TableIcon from 'react-icons/lib/fa/table'
import ListIcon from 'react-icons/lib/fa/list'
import DataIcon from 'react-icons/lib/fa/database'
import '../css/decision-page.css'

class DecisionPage extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen

        this.beIndfferent = this.beIndfferent.bind(this)


    }
    beIndfferent(){
      this.props.makeSelection(Math.floor(Math.random() * 2),1)
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

        let view
        if (Object.keys(parms).length === 0) return (<Redirect to="/"/>)
        const {decType,indiff,preferenceOrdering} = parms

        if (displayMode === "MainView") {
            view = (<TableView person={person}
                    currentChosen={currentChosen}
                    makeSelection={makeSelection}
                    showingFeatures={showingFeatures}
                    availableFeatures={availableFeatures}
                  />)
        } else if (displayMode === "DataView") {
          view = (<DataView features={features} featurePreference={featurePreference} labels={labels}
          randomChoices={randomChoices}

          />)
        } else if (displayMode === "SummaryView"){
          view = (<SummaryView features={features}
            featurePreference={featurePreference}
            labels={labels}
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
                            {/* <Button animated='vertical' onClick={() => changeDisplay("FeatureListView")}>
                                <Button.Content visible><ListIcon/></Button.Content>
                                <Button.Content hidden>List</Button.Content>
                            </Button> */}
                            <Button animated='vertical' onClick={() => changeDisplay("MainView")}>
                                <Button.Content visible><TableIcon/></Button.Content>
                                <Button.Content hidden>Table</Button.Content>
                            </Button>
                            <Button animated='vertical' onClick={() => changeDisplay("SummaryView")}>
                                <Button.Content visible><Icon name="bar chart"/></Button.Content>
                                <Button.Content hidden>Statistics</Button.Content>
                            </Button>
                            <Button animated='vertical' onClick={() => changeDisplay("DataView")}>
                                <Button.Content visible><DataIcon/></Button.Content>
                                <Button.Content hidden>Data</Button.Content>
                            </Button>
                        </Button.Group>
                    </Header>

                    <Divider/>
                    {view}
                    <Divider/>



                    <Divider/>
                    <Container fluid textAlign="center">


                        {
                          indiff && displayMode === "MainView"?
                            (<Button size="large" animated circular onClick={this.beIndfferent}>
                                <Button.Content color='green' visible>Flip a coin</Button.Content>
                                <Button.Content hidden>
                                    {"Random choice"}
                                </Button.Content>
                            </Button>): null
                        }




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
        makeSelection: (sel,random=0) => {
            let choice = [0,0]
            choice[sel] = 1
            return dispatch({type: "SELECTION", choice,random})
              },
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
