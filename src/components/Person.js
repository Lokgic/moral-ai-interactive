import Chance from 'chance'
const chance = new Chance()

const {NODE_ENV,PUBLIC_URL} = process.env


// export const featureList = {
//   drinking:"drinks per week",
//   health:"additional health issues",
//   exercising: "hours of exercising per week",
//   dependents:"number of dependents",
// }
//
// const chanceList = {
//   drinking:()=>chance.integer({min:0,max:20}),
//   health:()=>chance.integer({min:0,max:3}),
//   exercising: ()=>Math.floor(Math.max(0,chance.normal({mean:5,dev:4}))),
//   dependents: ()=>Math.floor(Math.max(0,chance.normal({mean:2,dev:1}))),
// }



export default class Person {
  constructor(featureList,features){
    console.log(features)
    // const gender = chance.gender()

    // const age = chance.age()

    // this.features = {name:chance.name({gender:features.gender})}
    this.features = {
                    name:chance.name({gender:features.gender}),
                    img:"",
                    ...features,
                  }

    // for (let key of Object.keys(featureList)){
    //   this.features[key] = features[key]
    // }

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



}
