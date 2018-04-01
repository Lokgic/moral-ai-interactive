import React, {Component} from 'react'
import {connect} from 'react-redux'
import ResultPage from '../components/ResultTable'

import MainView from '../components/CardView'
import {
  FlexContainer,
  MainViewContainer,
  QuestionTop,
  QuestionBottom,
  MessageContainer
} from '../components/StyledComponents'




import {Icon} from '../Scenario'





import DataTable from '../components/Table'



import '../css/decision-page.css'


const devMode = true


class DecisionPage extends Component {
  constructor(props){
    super(props)
    this.handleSelection = this.handleSelection.bind(this)
  }
  handleSelection(decision,random){
    const {
      person,
      uuid,
      trial,
      makeSelection,
      timestamp
    } = this.props
    const end = Date.now();
    const start = timestamp;
    const delay = end - start;
    const left = person[0].features;
    const scenarioId = left.scenarioId;
    const right = person[1].features;
    makeSelection({
      left,
      right,
      decision,
      random,
      scenarioId,
      uuid,
      delay,
      start,
      end,
      uuid,
      trial
    })

  }


    render() {
        const {
            person,
            currentChosen,
            makeSelection,
            displayMode,
            features,
            labels,
            randomChoices,
            n_trials,
            mouseOverState,
            mouseOver,
            setCurrentChosen,
            setCurrentRandom,
            currentRandom,
            delay,
            setModal
        } = this.props


        let view
        if (displayMode === "result") view = <ResultPage
                                                features={features}
                                                labels={labels}
                                                randomChoices={randomChoices}
                                                delay={delay}
                                                  />
        else {
          const names = person.map(d=>d.features.name)

          const percent = (labels.length/n_trials) * 100
          view = (

            <FlexContainer>
            <MainViewContainer>
              {/* <MessageTop>
                Both of these individuals are in need of a kidney, but there is only one.
              </MessageTop> */}
                <QuestionTop>
                  Who should receive
                </QuestionTop>
                {/* <QuestionBottom onClick={()=>changeDisplay("table")}> */}
                <QuestionBottom>
                  the kidney ?
                </QuestionBottom>
                <MessageContainer>
                  <span   onClick = {()=>setModal(2)}>  <Icon
                      icon="question"
                      style = {{height:20,cursor:'pointer'}}

                    /></span>

                  {/* <MessageBottom>
                    {MouseOverHelper(mouseOverState)}

                  </MessageBottom> */}


                </MessageContainer>

                  <MainView person={person}
                          currentChosen={currentChosen}
                          makeSelection={makeSelection}
                          mouseOver={mouseOver}
                          mouseOverState={mouseOverState}
                          currentChosen={currentChosen}
                          setCurrentChosen={setCurrentChosen}
                          setCurrentRandom={setCurrentRandom}
                          makeSelection={this.handleSelection}
                          currentRandom={currentRandom}
                          trial={{n:n_trials,index:labels.length}}
                          percent={percent}
                        />

              </MainViewContainer>
            </FlexContainer>
          );
        }

        return view;
    }

}

const mapDispatchToProps = dispatch => {
    return {
        makeSelection: (data) => {

            return dispatch({type: "SEND_SELECTION", data})
              },
        chooseFeature: feature => dispatch({type: "CHOOSE_FEATURE", feature}),
        addFeature: feature => dispatch({type: "ADD_FEATURE", feature}),
        addData: (data,random=0) => dispatch({type: "ADD_DATA", data,random}),
        changeDisplay: displayMode => dispatch({type: "CHANGE_DISPLAY", displayMode}),
        mouseOver:input=> dispatch({type: "MOUSE_OVER", input}),
        setCurrentChosen:input=>dispatch({type:"SET_CURRENT_CHOSEN",input}),
        setCurrentRandom:()=>dispatch({type:"SET_CURRENT_RANDOM"}),
        getAllDps:()=>dispatch({type:"GET_ALL_DPS"}),
        postDps:data=>dispatch({type:"POST_DPS",data}),
        setModal:value=>dispatch({type:"SET_MODAL",value})

    }
}

const mapStateToProps = state => {

    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionPage)
