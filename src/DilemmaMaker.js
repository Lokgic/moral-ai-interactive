import React from 'react'
import Person from './components/Person'
import Chance from 'chance'
import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import GenderIcon from 'react-icons/lib/fa/transgender-alt'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'



const chance = new Chance()

export const iconList = {
    age: (<CakeIcon/>),
    gender: <GenderIcon/>,
    health: <HealthIcon/>,
    exercising: <RunnerIcon/>,
    dependents: <ChildIcon/>,
    drinking: <DrinkIcon/>
}

export const featureList = {
  "age":"age",
  "gender":"gender",
  drinking:"drinking habit",
  health:"additional health issues",
  exercising: "exercising habit",
  dependents:"number of dependents",
}

export const translationList = {
  age:d=>d,
  gender:d=>d,
  health:d=>["none","minor","serious"][d],
  drinking:d=>["never","rare","moderate","frequent"][d],
  exercising:d=>d + " hours per week",
  dependents:d=>d

}

const chanceList = {
  drinking:()=>chance.integer({min:0,max:3}),
  health:()=>chance.integer({min:0,max:2}),
  exercising: ()=>Math.floor(Math.max(0,chance.normal({mean:5,dev:4}))),
  dependents: ()=>Math.floor(Math.max(0,chance.normal({mean:2,dev:1}))),
  gender:()=>chance.gender(),
  age:()=>chance.age()
}


export const DilemmaMaker = (mode="random",n=2)=>{
  const index = [...Array(n).keys()]
  const features = index
                .map(i=>Object.keys(featureList).reduce(
                  (p,d)=>{
                    p[d]=chanceList[d]()
                    return p
                  },{}))
  const person = index.map(d=>new Person(featureList,features[d]))


  while (person[0].features.img === person[1].features.img){
    person[0].getNewImg()

  }
  return person
}
