import Chance from 'chance'
const chance = new Chance()

const {NODE_ENV,PUBLIC_URL} = process.env


export const featureList = {
  drinking:"drinking habits",
  health:"health issues",
  exercising: "exercising habits",
  children:"number of children",
}

const chanceList = {
  drinking:()=>chance.integer({min:0,max:10}),
  health:()=>chance.integer({min:0,max:3}),
  exercising: ()=>chance.integer({min:0,max:40}),
  children: ()=>chance.integer({min:0,max:10}),
}



export default class Person {
  constructor(props){
    const gender = chance.gender()
    const name = chance.name({gender})
    const age = chance.age()
    let img = ''
    this.features = {gender,name,age,img}
    for (let key of Object.keys(chanceList)){
      this.features[key] = chanceList[key]()
    }
    this.getNewImg()
  }
  getNewImg(){
    const {gender,img} = this.features
    let prefix = (NODE_ENV === "production")?  PUBLIC_URL+"/heads/" : './heads/'
    let newImg = prefix+gender.toLowerCase()+'/'+chance.integer({min:1,max:2})+'.png'
    while (img === newImg){
      newImg = prefix+gender.toLowerCase()+'/'+chance.integer({min:1,max:2})+'.png'

    }
    this.features.img = newImg
  }
  getFeatures(){
    return this.features
  }
  addFeatures(newFeatures){

    this.features = {
      ...this.features,
      [newFeatures]:chance.integer({min:1,max:200})
    }
  }


}
