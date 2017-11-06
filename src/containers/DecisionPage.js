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
import CardView from '../components/CardView'
import TableView from '../components/TableView'
import DataView from '../components/DataView'
import GridView from '../components/GridView'
import PreferenceOrdering from '../components/PreferenceOrdering'
import {  Redirect } from 'react-router'
import DiscreteChoices from '../components/DiscreteChoices'
import ContinuousChoices from '../components/ContinuousChoices'
import {iconList as icons} from '../DilemmaMaker'
import TableIcon from 'react-icons/lib/fa/table'
import ListIcon from 'react-icons/lib/fa/list'
import DataIcon from 'react-icons/lib/fa/database'


class DecisionPage extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen

        this.beIndfferent = this.beIndfferent.bind(this)


    }
    beIndfferent(){
      let choice = [0,0]
      choice[Math.floor(Math.random() * 2)] = 1
      this.props.makeSelection(choice,1)
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

        if (displayMode === "TableView") {
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

                    <Divider/>
                    {view}
                    <Divider/>



                    <Divider/>
                    <Container fluid textAlign="center">


                        {
                          indiff?
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
        makeSelection: sel => {
            let choice = [0,0]
            choice[sel] = 1
            return dispatch({type: "SELECTION", choice})
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
