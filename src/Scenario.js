import Person from './components/Person'
import Chance from 'chance'
import {randomUniform, randomNormal} from 'd3-random'
import React, {Component} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBirthdayCake  from '@fortawesome/fontawesome-free-solid/faBirthdayCake'
import glassMartini  from '@fortawesome/fontawesome-free-solid/faGlassMartini'
import faGavel from '@fortawesome/fontawesome-free-solid/faGavel'
import faFootballBall   from '@fortawesome/fontawesome-free-solid/faFootballBall'
import faUser  from '@fortawesome/fontawesome-free-solid/faUser'
import faUsers  from '@fortawesome/fontawesome-free-solid/faUsers'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

 const getIcon = {
  "age":faBirthdayCake,
  drinking:glassMartini,
  crime:faGavel,
  exercising: faFootballBall,
  dependents:faUsers,
  user:faUser
}



export const Icon = ({icon,style})=>(
  <FontAwesomeIcon
    icon={getIcon[icon]}
    style={{width:"100%",height:"100%"}}
  />)



const rnorm = (mu=2,sigma=2,min=0,max=4)=>{
  const gen = randomNormal(mu,sigma)
  const out = Math.floor(Math.max(min,gen()))
  return Math.min(max, out)
}

const runif = (a=0,b=4)=>{
  const gen = randomUniform(a,b)
  return Math.floor(Math.max(0,gen()))
}


const chance = new Chance()


export const featureNames = ["age","drinking","crime","exercising","dependents"]

export const featureList = {
  "age":"age",
  drinking:"drinking habit",
  crime:"criminal record",
  exercising: "exercising habit",
  dependents:"dependents",
}



const distros = {
  "age":rnorm,
  "drinking":runif,
  "crime":runif,
  "exercising":runif,
  "dependents":runif
}

// const chanceList = {
//   drinking:()=>chance.integer({min:0,max:3}),
//   health:()=>chance.integer({min:0,max:2}),
//   exercising: ()=>Math.floor(Math.max(0,chance.normal({mean:5,dev:4}))),
//   dependents: ()=>Math.floor(Math.max(0,chance.normal({mean:2,dev:1}))),
//   age:()=>chance.age()
// }


export const translationList = {
  name:d=>d,
  age:d=>["infant","teenager","20-39","40-59","60+"][d],
  health:d=>["none","minor","serious"][d],
  drinking:d=>["never","rare","social drinker","recovering alcholic","alchol abuser"][d],
  crime:d=>["none","minor non-violent","minor violent","major non-violent","major violent"][d],
  exercising:d=>["never","monthly","weekly","daily","professional athlete'"][d],
  dependents:d=>["children: 0 elderly: 0","children: 1 elderly: 0","children: 0 elderly: 1","children: 1 elderly: 1","children: 2 elderly: 2"][d],
  random:d=>["choice","random"][d],
  label:d=>["not chosen","chosen"][d]

}


export const DilemmaMaker = (mode="random",n=2)=>{
  const index = [...Array(n).keys()]
  const features = index
                .map(i=>Object.keys(featureList).reduce(
                  (p,d)=>{
                    p[d]=distros[d]()
                    return p
                  },{}))
  const persons = index.map(d=>new Person(featureList,features[d]))
  console.log(persons)
  for (let p of persons){
    if (p.features.age===0){
      p.features = {
        ...p.features,
        drinking:0,
        crime:0,
        exercising:0,
        dependents:0
      }
    }
  }

  return persons
}
