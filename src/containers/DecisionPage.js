import React, {Component} from 'react'
import {connect} from 'react-redux'

import MainView from '../components/CardView'
import {
  FlexContainer,
  MainViewContainer,
  QuestionTop,
  QuestionBottom,
  MessageContainer,
  MessageTop,
  MessageBottom,
  Divider
} from '../components/StyledComponents'
import MouseOverHelper from '../components/MouseOverHelper'


import {  Redirect } from 'react-router'

import {iconList as icons} from '../DilemmaMaker'

import {random as rn} from 'lodash'

import BlankCircle from 'react-icons/lib/fa/circle'
import CheckIcon from 'react-icons/lib/md/check-circle'





import '../css/decision-page.css'


const devMode = true

const checkIconStyle = {
  width:70,
  height:70,
  color:'#608796',
  cursor:'pointer'
};

class DecisionPage extends Component {
    constructor(props) {
        super(props)
        this.choice = props.currentChosen
        // this.toggleLoading = this.toggleLoading.bind(this)
        // this.handleConfirm = this.handleConfirm.bind(this)

    }
    // beIndfferent(){
    //   const {currentRandom,setCurrentRandom} = this.props
    //
    //     setCurrentRandom()
    //
    // }

    // handleConfirm(){
    //   // this.props.setCurrentChosen(Math.floor(Math.random() * 2))
    //
    //   if (this.props.currentChosen !== -1){
    //     this.props.makeSelection(this.props.currentChosen )
    //
    //   }
    //
    // }

    // toggleLoading(){
    //
    //   this.setState({loading:!this.state.loading})
    // }

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
            n_trials,
            mouseOverState,
            mouseOver,
            setCurrentChosen,
            setCurrentRandom,
            currentRandom
        } = this.props
        const names = person.map(d=>d.features.name)

        const percent = (labels.length/n_trials) * 100

        let view
        if (Object.keys(parms).length === 0) return (<Redirect to="/"/>)
        const {decType,indiff,preferenceOrdering} = parms




        return (

          <FlexContainer>
          <MainViewContainer>
            <MessageTop>
              Both of these individuals are in need of a kidney, but there is only one.
            </MessageTop>
              <QuestionTop>
                Who should receive
              </QuestionTop>
              <QuestionBottom>
                the kidney ?
              </QuestionBottom>
              <MessageContainer>

                <MessageBottom>
                  {MouseOverHelper(mouseOverState)}
                </MessageBottom>


              </MessageContainer>

                <MainView person={person}
                        currentChosen={currentChosen}
                        makeSelection={makeSelection}
                        showingFeatures={showingFeatures}
                        availableFeatures={availableFeatures}
                        mouseOver={mouseOver}
                        mouseOverState={mouseOverState}
                        currentChosen={currentChosen}
                        setCurrentChosen={setCurrentChosen}
                        setCurrentRandom={setCurrentRandom}
                        makeSelection={makeSelection}
                        currentRandom={currentRandom}
                      />
                <Divider/>
                {/* <ButtonGroup>
                  {currentChosen===0?<CheckIcon style={checkIconStyle}
                    onClick={()=>setCurrentChosen(0)}
                  />:
                  <BlankCircle style={checkIconStyle}
                      onClick={()=>setCurrentChosen(0)}
                  />}
                  <div >
                    <Button onClick={this.beIndfferent}>
                      Flip a coin
                    </Button>
                    <Button primary onClick={this.handleConfirm}>
                      Confirm
                    </Button>
                  </div>

                    {currentChosen===1?<CheckIcon style={checkIconStyle}
                      onClick={()=>setCurrentChosen(1)}
                    />:
                      <BlankCircle style={checkIconStyle}
                        onClick={()=>setCurrentChosen(1)}
                      />}

                </ButtonGroup> */}

            </MainViewContainer>
          </FlexContainer>
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
        changeDisplay: displayMode => dispatch({type: "CHANGE_DISPLAY", displayMode}),
        mouseOver:input=> dispatch({type: "MOUSE_OVER", input}),
        setCurrentChosen:input=>dispatch({type:"SET_CURRENT_CHOSEN",input}),
        setCurrentRandom:()=>dispatch({type:"SET_CURRENT_RANDOM"})


    }
}

const mapStateToProps = state => {

    return state.dec
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionPage)
