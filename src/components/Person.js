import Chance from 'chance'
const chance = new Chance()

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
for (let key of Object.keys(chanceList)){
  console.log(key)
}


export default class Person {
  constructor(props){
    const gender = chance.gender()
    const name = chance.name({gender})
    const age = chance.age()
    const img = '/heads/'+gender+'/'+chance.integer({min:1,max:2})+'.png'
    this.features = {gender,name,age,img}
    for (let key of Object.keys(chanceList)){
      this.features[key] = chanceList[key]()
    }

  }
  getNewImg(){
    const {gender,img} = this.features

    let newImg = '/heads/'+gender+'/'+chance.integer({min:1,max:2})+'.png'
    while (img === newImg){
      newImg = '/heads/'+gender+'/'+chance.integer({min:1,max:2})+'.png'

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
