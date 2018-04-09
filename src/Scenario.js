import Person from './components/Person'
import {randomUniform, randomNormal} from 'd3-random'
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBirthdayCake  from '@fortawesome/fontawesome-free-solid/faBirthdayCake'
import glassMartini  from '@fortawesome/fontawesome-free-solid/faGlassMartini'
import faGavel from '@fortawesome/fontawesome-free-solid/faGavel'
import faUser  from '@fortawesome/fontawesome-free-solid/faUser'
import faUsers  from '@fortawesome/fontawesome-free-solid/faUsers'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import faStethoscope from '@fortawesome/fontawesome-free-solid/faStethoscope'
import faChild  from '@fortawesome/fontawesome-free-solid/faChild'
import faBlind  from '@fortawesome/fontawesome-free-solid/faBlind'
import faQuestionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle'



 const getIcon = {
  "age":faBirthdayCake,
  drinking:glassMartini,
  crime:faGavel,
  dependents:faUsers,
  user:faUser,
  health:faStethoscope,
  child:faChild,
  elder:faBlind,
  question:faQuestionCircle
}



export const Icon = ({icon,style})=>(
  <FontAwesomeIcon
    icon={getIcon[icon]}
    style={
      {
        width:"100%",
        height:"100%",
        ...style
      }
    }
  />)

export const featureExplanation = {
  "age":"Should age matter? Are younger or older patient more deserving of a kidney? You have to decide!",
  drinking:"Should we consider a patient's drinking habits? You will know patient's drinking habit before and after the diagnosis. ",
  crime:"Should we judge someone by his/her criminal record? Does the nature of the crime matter?",
  dependents:(<span>Sometimes a patient has someone depending on them - it could be a child or an elderly person such as a parent.
    Each dependent is represented with an icon. For example,
    <Icon icon="child" style={{"width":15}}/><Icon icon="elder" style={{"width":15}}/> means the patient has one child dependent and one elder dependent.</span>),
  health:"A patient might have additional non-kidney related health problems. This may affect how healthy they will be after receving a kidney."
}

const rnorm = (mu=2,sigma=1,min=0,max=4)=>{
  const gen = randomNormal(mu,sigma)
  const out = Math.floor(Math.max(min,gen()))
  return Math.min(max, out)
}

const runif = (a=0,b=4)=>{
  const gen = randomUniform(a,b)
  return Math.floor(Math.max(0,gen()))
}






export const featureNames = ["age","health","drinking","crime","dependents"]

export const featureList = {
  "age":"age",
  drinking:"pre|post diagnosis drinking habit",
  crime:"criminal record",
  exercising: "exercising habit",
  dependents:"young|old dependents",
  health:"additional health problems"
}



const distros = {
  "age":()=>runif(15,80),
  "drinking":runif,
  "crime":runif,
  "exercising":runif,
  "dependents":runif,
  "health":()=>runif(0,3)

}

const makeDepIcons = i=>{
  let out
  switch(i){
    case 0:
      return "none"
      break;
    case 1:
      out = [1,0];
      break;
    case 2:
      out = [0,1];
      break;
    case 3:
      out = [1,1];
      break;
    case 4:
      out = [2,2];
      break;
    default:
      return "none"
  }
  return (
    <span>
    {
      out.reduce((acc,value,i)=>{
        for (let k = 0; k<value;k++){
          acc.push(<FontAwesomeIcon key = {`${['faChild','faBlind'][i]}_${k}`}icon = {[faChild,faBlind][i]} style={{width:"20px",height:"20px"}}/>)
      }
      if (i===0) acc.push("|")
      return acc;
      },[])
    }
            </span>)
}


const makeDrinkIcons = d=>{

  const pre = ["none","moderate","abusive","none","none"]
  const post = ["none","none","none","moderate","abusive"]
  return (
    <div><span> {pre[d] }</span> <span> | </span><span> {post[d]} </span></div>
  )
}


export const translationList = {
  name:d=>d,
  age:d=>d,
  health:d=>["none","minor","serious"][d],
  drinking:d=>makeDrinkIcons(d),
  // drinking:d=>["none", "moderate(pre-diagnosis)", "abusive(pre-diagnosis)", "moderate(post-diagnosis)", "abusive(post-diagnosis)"][d],
  crime:d=>["none","misdemeanor","non-violent felony","violent felony","multiple violent felonies"][d],
  dependents:d=>makeDepIcons(d),
  random:d=>["choice","random"][d],
  label:d=>["not chosen","chosen"][d]

}


export const DilemmaMaker = (mode="random",n=2)=>{
  const index = [...Array(n).keys()]
  const features = index
                .map(i=>featureNames.reduce(
                  (p,d)=>{
                    p[d]=distros[d]()
                    return p
                  },{}))
  const persons = index.map(d=>new Person(featureList,features[d]))

  return persons
}

export class DataGenerator{
  constructor(src,featureNames){
    this.source = src;
    this.loc = 0;
    this.featureNames = featureNames;
  }
  next(){
    const out = this.loc + 1 >= this.source.length? null : [this.source[this.loc],this.source[this.loc + 1]].map(d=>new Person(featureNames,d));
    this.loc += 2;
    // console.log(this.source[this.loc])
    return out;
  }
  getTrialLength(){
    return Math.floor(this.source.length/2)
  }
}
