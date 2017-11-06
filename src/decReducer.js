import {DilemmaMaker,featureList} from './DilemmaMaker'

const person  = DilemmaMaker()





const makeTrueFalse = id=>[
  {key:id+"y", 'text': "Yes", "value":true},
  {key:id+"n", "text":'No',"value":false}
]


const expParameters = [
  { id:"decType",
    "label":"Decision Type",
    "options":[
      {key:"continuous", 'text': "Continuous", "value":"continuous"},
      {key:"discrete","text":'Discrete',"value":"discrete"}
    ]
  },
  { "id":"indiff",
    "label":"Allow Indifference?",
    "options":makeTrueFalse("indiff")
  },
  { "id":"preferenceOrdering",
    "label":"Preference Ordering",
    "options":makeTrueFalse("preferenceOrdering")
  }
]




export const initialState = {
  person,
  availableFeatures:{...featureList},
  showingFeatures:["health", "exercising", "drinking", "dependents"],
  currentChosen:"none",
  labels:[],
  features:[],
  featurePreference:[],
  randomChoices:[],
  displayMode:"TableView",
  expParameters,
  parms:{decType:"discrete", indiff:true, preferenceOrdering:false}
}


export const reducer = (state = initialState, action)=>{
  switch(action.type){
    case "INITALIZE":
      return {
        ...state,
        ...action.newParms
      }
    // case "SELECTION":
    //   return{
    //     ...state,
    //     currentChosen:action.choice
    //   }
    case "CHOOSE_FEATURE":
      return {
        ...state,
        currentChosen:"More Info",
        nextFeature: action.feature
      }
    case "ADD_FEATURE":
      let availableFeatures = {}
      Object.keys(state.availableFeatures)
                .forEach(d=>d!==action.feature?availableFeatures[d] = state.availableFeatures[d]
                                              :null)
      return{
        ...state,
        currentChosen:"none",
        nextFeature:undefined,
        showingFeatures:[...state.showingFeatures,
                        action.feature],
        availableFeatures


      }
    case "SELECTION":
      const show = state.parms.preferenceOrdering ? [] : state.showingFeatures
      const avail = state.parms.preferenceOrdering ? featureList : state.availableFeatures
      const pref = state.parms.preferenceOrdering ?    [...state.featurePreference,
                                                         state.showingFeatures
                                                                  ]:[]



       return {
         ...state,
         labels:[...state.labels, action.choice],
         features:[...state.features, [state.person[0].features,state.person[1].features]],
         availableFeatures:avail,
         showingFeatures:show,
         currentChosen:"none",
         featurePreference:pref,
         randomChoices:[...state.randomChoices,action.random],
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
    default:
      return state
  }
}

export default reducer
