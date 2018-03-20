import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {featureNames} from './Scenario'



const postURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/post-dps':'https://moralai.herokuapp.com/post-dps';
const getURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/getAllDps':'https://moralai.herokuapp.com/get-dps';



function* fetchDPS(){
  try{
    const d = yield fetch(getURL,{method:'get'})
           .then((res) => { return res.json() })
           .then((data) => {
              console.log(data)
               });
    } catch(e){
      console.log(e)
    }

}



function* postDPS(action){

  // const {
  //   features,
  //   DPSubmitted,
  //   labels,
  //   random,
  //   delay,
  //   postDps,
  //   uuid,
  //   startend,
  //   scenarioId,
  //   trial
  // } = action.payload

    const {data} = action;
    yield put({type:"SELECTION",data})
    const {
      left,
      right,
      decision,
      random,
      scenarioId,
      uuid,
      delay,
      start,
      end,
      trial
    } = action.data
  let payload = {
    scenario_id:scenarioId,
    random,
    delay,
    start,
    end,
    trial,
    decision,
    user_id:uuid,
    left_name:left.name,
    right_name:right.name,
  }
  const order = ["left","right"]
  for (let o of order){
      payload[o] = featureNames.map(d=>data[o][d])
    }

console.log(payload)
  const d = {
      method: 'post',
      // mode: 'no-cors',
      url:postURL ,
      headers: {
        "Content-Type": "application/json"
      },
      data: payload,
    }
  try{
    const resp = yield axios(d)
         .then((res) => {
           console.log(res)
           return res
         })
          yield put({type:"DATAPOINT_POSTED"})
        } catch(e){
          console.log(e)
        }


}


function* mySaga(){
  yield takeEvery("GET_ALL_DPS",fetchDPS)
  yield takeEvery("SEND_SELECTION",postDPS)
}


export default mySaga
