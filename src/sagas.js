import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

// const PostDPSApi = (DPArray)=>{
//     fetch('http://localhost:5000/post-dp', {
//         method: 'POST',
//         headers : new Headers(),
//         body:JSON.stringify({
//         	"session_id":"2323213",
//         	"name":"WKK",
//         	"age":55,
//         	"health":3,
//         	"exercise":2,
//         	"dependents":2,
//         	"delay":323
//         })
//     }).then((res) => res.json())
//     .then((data) =>  console.log(data))
//     .catch((err)=>console.log(err))
// }

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

  const {features, index, labels, random,delay,postDps,uuid} = action.data
  const payload = [0,1].map(
    d=>{
      return {
        ...features[d],
        index,
        label:labels[d],
        random,
        delay,
        session_id:uuid
      }
    }
  )
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
  yield takeEvery("POST_DPS",postDPS)
}


export default mySaga
