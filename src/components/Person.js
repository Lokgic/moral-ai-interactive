import Chance from 'chance';
const chance = new Chance();

export default class Person {
  constructor(featureList, features) {
    const name =
      Object.keys(features).indexOf('name') === -1
        ? chance.name().split(' ')
        : features.name.split(' ');

    this.features = {
      ...features,
      name: `${name[0][0]}. ${name[1][0]}.`
    };
  }

  getFeatures() {
    return this.features;
  }
}
