import {DataGenerator,featureList, featureNames} from './Scenario'
import {v1} from 'uuid';
import dataSource from "./data/MockData"


const dg = new DataGenerator(dataSource)


export const initialState = {
  uuid: "",
  person:dg.next(),
  DPSubmitted:0,
  availableFeatures:{...featureList},
  currentChosen:-1,
  currentRandom:0,
  labels:[],
  features:[],
  randomChoices:[],
  n_trials:dg.getTrialLength(),
  initiated:Date.now(),
  timestamp:Date.now(),
  startend:[],
  delay:[],
  scenarioId:0,
  trial:"",
  displayMode:"decision",
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
      const uuid =  action.uuid === "" | null? state.uuid:action.uuid
      const trial =  action.trial === "" | null? state.trial:action.trial

      return {
        ...state,
        modal:2,
        timestamp:Date.now(),
        uuid,trial
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
      // const end = Date.now();
      // const start = state.timestamp
      // const delay = end - start
      const {data} = action;
      const person = dg.next();
      const displayMode = person === null? "result" : "decision";
       return {
         ...state,
         labels:[...state.labels, data.decision],
         features:[...state.features, [data.left,data.right]],
         currentChosen:-1,
         currentRandom:0,
         randomChoices:[...state.randomChoices,data.random],
         delay:[...state.delay, data.delay],
         startend:[...state.startend,[data.start,data.end]],
         mouseOverState:"default",
         timestamp:Date.now(),
        person,
        displayMode

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
