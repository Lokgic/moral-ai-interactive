
const initialState = {
  page:"SetUp"
}


export default (state = initialState, action)=>{
  switch(action.type){
    case "CHANGE_PAGE":
      return {
        ...state,
        page:action.page
      }
    default:
      return state
  }
}
