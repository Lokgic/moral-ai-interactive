import Person,{featureList} from './components/Person'

const person  = [new Person(), new Person()]



while (person[0].features.img === person[1].features.img){
  person[0].getNewImg()

}

// let infoOptions = [
//   {
//     text:" feature a",
//     value:"a"
//   },
//   {
//     text:" feature b",
//     value:"b"
//   },
//   {
//     text:" feature c",
//     value:"c"
//   },
//   {
//     text:" feature d",
//     value:"d"
//   }
// ]




export const initialState = {
  person,
  availableFeatures:{...featureList},
  showingFeatures:[],
  currentChosen:"none",
  hit:[],
  miss:[],
  featurePreference:[]
}


export const reducer = (state = initialState, action)=>{
  switch(action.type){
    case "SELECTION":
      return{
        ...state,
        currentChosen:action.choice
      }
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
    case "ADD_DATA":

       return {
         ...state,
         availableFeatures:featureList,
         showingFeatures:[],
         currentChosen:"none",
         featurePreference:[
            ...state.featurePreference,
            state.showingFeatures

         ],
         hit:[...state.hit,
              state.person[action.choice].features],
        miss:[...state.miss,
             state.person[1-action.choice].features],
        person:[new Person(), new Person()]

       }
    default:
      return state
  }
}

export default reducer
