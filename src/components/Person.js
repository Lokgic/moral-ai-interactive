import Chance from 'chance'
const chance = new Chance()

const {NODE_ENV,PUBLIC_URL} = process.env



export default class Person {
  constructor(featureList,features){
    const casing = 'upper'
    this.features = {
                    name:chance.letter({casing})+". "+chance.letter({casing})+".",
                    img:"",
                    ...features,
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



}
