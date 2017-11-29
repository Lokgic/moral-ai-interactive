import Chance from 'chance'
const chance = new Chance()




export default class Person {
  constructor(featureList,features){


    const name = chance.name().split(' ')

    this.features = {
                    name:`${name[0][0]}. ${name[1][0]}.`,
                    ...features,
                  }

  }

  getFeatures(){
    return this.features
  }



}
