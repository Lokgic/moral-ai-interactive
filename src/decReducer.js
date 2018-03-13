import {DilemmaMaker,featureList} from './Scenario'
import {v1} from 'uuid';

const person  = DilemmaMaker()
const uuid = v1()


export const initialState = {
  uuid,
  person,
  DPSubmitted:0,
  availableFeatures:{...featureList},
  currentChosen:-1,
  currentRandom:0,
  labels:[],
  features:[],
  randomChoices:[],
  n_trials:13,
  initiated:Date.now(),
  timestamp:Date.now(),
  startend:[],
  delay:[],
  scenarioType:0,
  trial:0,
  displayMode:"MainView",
  modal:1,
  mouseOverState:"default"
}


export const reducer = (state = initialState, action)=>{
  switch(action.type){
    case "INITALIZE":
      return {
        ...state,
        ...action.newParms
      }
    case "MOUSE_OVER":
      return{
        ...state,
        mouseOverState:action.input
      }
    case "CHANGE_DISPLAY":
      return {
        ...state,
        displayMode:action.displayMode
      }
    case "BEGIN_SESSION":
      return {
        ...state,
        modal:action.value
      }
    case "SET_MODAL":
      return {
        ...state,
        modal:action.value
      }
    case "DATAPOINT_POSTED":
      return{
        ...state,
        DPSubmitted:state.DPSubmitted + 1
      }
    case "CHOOSE_FEATURE":
      return {
        ...state,
        currentChosen:"More Info",
        nextFeature: action.feature
      }
    case "SELECTION":{
      const end = Date.now();
      const start = state.timestamp
      const delay = end - start
       return {
         ...state,
         labels:[...state.labels, action.choice],
         features:[...state.features, [state.person[0].features,state.person[1].features]],
         currentChosen:-1,
         currentRandom:0,
         randomChoices:[...state.randomChoices,action.random],
         delay:[...state.delay, delay],
         startend:[...state.startend,[start,end]],
         mouseOverState:"default",
         timestamp:Date.now(),
        person:DilemmaMaker(),
        datapointSubmitted:0

       }
     }
    case "CHANGE_PARAMETER":
      return {
        ...state,
        parms:{
          ...state.parms,
          [action.parm]:action.val
        }
      }
    case "SET_CURRENT_CHOSEN":{
      const chosen = action.input===state.currentChosen? -1:action.input;
      const random = 0
      return {
        ...state,
        currentChosen:chosen,
        currentRandom:random
      }
    }
    case "SET_CURRENT_RANDOM":{
      const random = 1-state.currentRandom
      const chosen = -1
      return {
        ...state,
        currentChosen:chosen,
        currentRandom:random
      }
    }
    default:
      return state
  }
}

export default reducer
