import React from 'react'
import {Statistic, Header, Image, Icon} from "semantic-ui-react"
import {iconList as icons} from '../DilemmaMaker'

const order = ["trial","name","age","gender","health","exercising","drinking","label","random"]
export default props =>{
  const {features,featurePreference,labels,randomChoices} = props
  //  let data = hit.map((d,i)=>{
  //   d.chosen = true
  //   return d
  // })
  //  data = data.concat(miss.map((d,i)=>{
  //   d.chosen = false
  //   return d
  // }))
  const data = features.reduce((arr,d,i)=>{
    const temp = [0,1].map(j=>{
      d[j].label = labels[i][j]
      d[j].trial = i
      d[j].random = randomChoices[i]
      return d[j]
    })

    return arr.concat(temp)
  },[])

  const stat = data.reduce((obj,d,i)=>{
    if (d.label === 1){
      obj.avgAge = i<2? d.age: (obj.avgAge+d.age)/2
      obj.drinking[d.drinking] += 1
      obj.dependents = i<2? d.dependents: (obj.dependents+d.dependents)/2
    }
    obj.coinflip += d.random
    return obj
  },{
    "avgAge":0,
    "coinflip":0,
    "drinking":[0,0,0,0],
    "dependents":0
  }

)

  stat.dependents = Math.round(stat.dependents)
  stat.avgAge = Math.round(stat.avgAge)
  stat.coinflip = stat.coinflip/2
  stat.drinking  = stat.drinking.reduce((m,d,i)=>d>stat.drinking[m]?i:m)
console.log(stat)
  return (
  <Statistic.Group widths = "5">
    <Statistic>
      <Statistic.Value>
        <Icon name="birthday"/>
        {stat.avgAge}
      </Statistic.Value>
      <Statistic.Label>Average Age</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>

        {stat.coinflip}
      </Statistic.Value>
      <Statistic.Label>Coin Flips</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>
          <Icon name="pointing up"/>
        {data.length/2}
      </Statistic.Value>
      <Statistic.Label>{data.length/2<2? "Decision Made":"Decisions Made"}</Statistic.Label>
    </Statistic>


  <Statistic size="mini">
    <Statistic.Label>Prefer</Statistic.Label>
    <Statistic.Value>
      {["Non","Light","Moderate","Heavy"][stat.drinking]}
    </Statistic.Value>
    <Statistic.Label>Drinkers</Statistic.Label>
  </Statistic>
  <Statistic>
    <Statistic.Value>
      <Icon name="child"/>
      {stat.dependents}
    </Statistic.Value>
    <Statistic.Label>Average Dependents</Statistic.Label>
  </Statistic>
</Statistic.Group>
  )
}
