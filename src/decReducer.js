import {DilemmaMaker,featureList} from './DilemmaMaker'

const person  = DilemmaMaker()





const makeTrueFalse = id=>[
  {key:id+"y", 'text': "Yes", "value":true},
  {key:id+"n", "text":'No',"value":false}
]



export const initialState = {
  person,
  availableFeatures:{...featureList},
  currentChosen:-1,
  currentRandom:0,
  labels:[],
  features:[],
  randomChoices:[],
  displayMode:"MainView",
  n_trials:5,
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
    case "CHOOSE_FEATURE":
      return {
        ...state,
        currentChosen:"More Info",
        nextFeature: action.feature
      }
    case "SELECTION":



       return {
         ...state,
         labels:[...state.labels, action.choice],
         features:[...state.features, [state.person[0].features,state.person[1].features]],
         currentChosen:-1,
         currentRandom:0,
         randomChoices:[...state.randomChoices,action.random],
         mouseOverState:"default",
        person:DilemmaMaker()

       }
    case "CHANGE_DISPLAY":
      return {
        ...state,
        displayMode:action.displayMode
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
