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
    Icon,
    Progress,
    Segment

} from 'semantic-ui-react'
import Legends from '../components/Legends'
import MainView from '../components/CardView'

// import SummaryView from '../components/SummaryView'
// import ProgressBar from '../components/ProgressBar'

import {  Redirect } from 'react-router'

import {iconList as icons} from '../DilemmaMaker'
// import TableIcon from 'react-icons/lib/fa/table'
// import ListIcon from 'react-icons/lib/fa/list'
// import DataIcon from 'react-icons/lib/fa/database'
import {random as rn} from 'lodash'

import '../css/decision-page.css'


const devMode = true

class DecisionPage extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen
        this.beIndfferent = this.beIndfferent.bind(this)
        this.toggleLoading = this.toggleLoading.bind(this)

        this.state = {loading:false}
    }
    beIndfferent(){
      this.props.makeSelection(Math.floor(Math.random() * 2),1)
    }
    toggleLoading(){

      this.setState({loading:!this.state.loading})
    }

    componentWillReceiveProps(nextProp){

      if (!devMode){
        this.setState({loading:true})
        setTimeout(()=>this.toggleLoading(), rn(1,2000))
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
            randomChoices,
            n_trials
        } = this.props
        const names = person.map(d=>d.features.name)

        const percent = (labels.length/n_trials) * 100

        let view
        if (Object.keys(parms).length === 0) return (<Redirect to="/"/>)
        const {decType,indiff,preferenceOrdering} = parms




        return (

          <div className="flex-container">
            <Legends/>
          <div className="flex-auto-margin" style={{
                width: "60%"
            }}>

                <Segment inverted>
                  <Progress indicating percent={percent} attached='top'/>
                  <Label as='span' ribbon = 'right'>{`${labels.length} / 13`}</Label>

                  <Header as = "span" style={{margin:0}}>
                      Who should receive the kidney?
                  </Header>
                  <Progress indicating percent={percent} attached='bottom'/>
                </Segment>
                <Divider/>
                <MainView person={person}
                        currentChosen={currentChosen}
                        makeSelection={makeSelection}
                        showingFeatures={showingFeatures}
                        availableFeatures={availableFeatures}
                      />
                <Divider/>
                <Container fluid>
                    <Button.Group fluid>
                    <Button
                      loading={this.state.loading}
                      disabled={this.state.loading}
                      onClick={()=>makeSelection(0)} secondary>
                      <Button.Content visible>
                        {`Choose ${names[0]}`}
                      </Button.Content>

                    </Button>
                    <Button.Or/>
                    <Button  loading={this.state.loading}
                      disabled={this.state.loading}
                      animated onClick={this.beIndfferent}>
                        <Button.Content

                           color='green' visible>Flip a coin</Button.Content>
                        <Button.Content hidden>
                            {"Random choice"}
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button
                      loading={this.state.loading}
                      disabled={this.state.loading}
                      onClick={()=>makeSelection(1)} secondary>
                      <Button.Content visible>
                        {`Choose ${names[1]}`}
                      </Button.Content>
                    </Button>
                  </Button.Group>
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
