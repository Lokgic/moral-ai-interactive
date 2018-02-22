import React, {Component} from 'react'

import {
  ResultPageFlex,
  MainViewContainer,
  BadgeContainer,
  BadgeHeading,
  BadgeDesc,
   PlotSvg,
   PlotContainer,
   PlotBox,
   PlotDesc,
   FeatureIcon,
   MessageTop,
   XLabel,
   AutoMarginWrapper,
   FlexContainer,
   QuestionBottom
} from '../components/StyledComponents'


import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'
import CoinIcon from 'react-icons/lib/fa/adjust'
import ConfirmIcon from 'react-icons/lib/fa/arrow-circle-right'


import {randomNormal as rnorm, randomUniform as runif} from 'd3-random'

import ResultPlot from '../components/ResultPlot'


const iconStyle = {margin:"auto",width:30, height:30}

const icons = {
    age: <CakeIcon style={iconStyle}/>,
    health: <HealthIcon style={iconStyle}/>,
    exercising: <RunnerIcon style={iconStyle}/>,
    dependents: <ChildIcon style={iconStyle}/>,
    drinking: <DrinkIcon style={iconStyle}/>,
    random: <CoinIcon style={iconStyle}/>,
    confirm:<ConfirmIcon style={iconStyle}/>
}



const makeSamples = (n=500) =>{
  let samples = []
  // let gen = rnorm(runif(30,70)(),runif(1,10)())
  const gen = rnorm(runif(30,70)(),runif(20,40)())
  for (let i = 0;i<n;i++){
    samples.push(Math.max(8,Math.min(90,gen())))
  }
  console.log(samples)
  return samples
}

const descDict = {
  'age':'Average Age',
  "dependents":"saving people with more dependents",
  "drinking":"frequent drinkers",
  "exercising":"people who exercise more",
  "health":"Health Issues",
  "random":"Proportion of Coinflips"
  }

const xLabs = {
  'age':['younger','older'],
  "dependents":["not important","important"],
  "drinking":["less deserving","more deserving"],
  "exercising":["less deserving","more deserving"],
  "health":["prefer less issues","prefer more issues"],
  "random":["low","high"]
}

const Badge = props=>{
  console.log(props)
  const {id,title,desc} = props.data



  return (<BadgeContainer>
    <BadgeHeading>{title}</BadgeHeading>
    <div style={{margin:'auto'}}>{icons[id]}</div>
    <BadgeDesc>{desc}</BadgeDesc>
  </BadgeContainer>)
}



const Plot = ({id,you,x1,x2,yt,yb})=>(
  <PlotBox w={x2-x1} h={yt-yb}>
      <PlotDesc key={id+"Desc"}

        >{descDict[id]}</PlotDesc>
    <PlotSvg w={x2-x1} h={yt-yb}>
      <ResultPlot
        xStart={x1}
        xEnd={x2}
        yTop={yt}
        yBottom={yb}
        drawn={makeSamples()}
        you={you}
        xlab={xLabs[id]}
      />
  </PlotSvg>
        {/* <XLabel>{}</XLabel> */}




</PlotBox>
)

export default ({features,labels,randomChoices})=>{
  const n = randomChoices.length;
  const data = features.reduce((arr,d,i)=>{
    const temp = [0,1].map(j=>{
      d[j].label = labels[i][j]
      d[j].trial = i
      d[j].random = randomChoices[i]
      return d[j]
    })
    return arr.concat(temp)
  },[])
  const total = data.length



  const stats = data.reduce((obj,d,i)=>{
    if (d.label === 1){
      obj.age += d.age;
      ["dependents","drinking","exercising","health"].forEach(fe=>{
        const t = d.trial;
        const selected = 1 - labels[t][0];
        obj[fe] += features[t][selected][fe] > features[t][1-selected][fe];
      })
    }
    return obj;
  },{'age':0,"dependents":0,"drinking":0,"exercising":0,"health":0
    })

  stats.age = stats.age/n;

  ["dependents","drinking","exercising","health"].forEach(d=>{
    stats[d] = stats[d]/n *100;
  })
  stats["random"] = randomChoices.reduce((count,d)=>count+d,0) /n *100

  const badgeDic = {}
  const badges = Object.keys(stats).reduce((b,d)=>{
    if (d==="random") {
      let badge = null
      if (stats[d]<10) badge = {"title":"The Decider",id:"random","desc":"Less than 10% of decisions made with coinflips"}
      else if (stats[d]>50)  badge = {"title":"Indecisive",id:"random","desc":"More than 50% of decisions made with coinflips"}
      if (badge !== null) b.push(badge)
    } else if (d==="dependents") {
      let badge = null
      if (stats[d]>70) badge = {"title":"Dependable",id:"dependents","desc":"Prefer patients with more dependents 70% of the time"}
      if (badge !== null) b.push(badge)
    } else if (d==="drinking") {
      let badge = null
      if (stats[d]>70) badge = {"title":"Prefer Drinkers",id:d,"desc":"Prefer patients that drink more frequently 70% of the time"}
      else if (stats[d]<30)  badge = {"title":"Dislike Drinkers",id:d,"desc":"Prefer patients that drink less frequently 70% of the time"}
      if (badge !== null) b.push(badge)
    }else if (d==="age") {
      let badge = null
      if (stats[d]<15) badge = {"title":"Children Lover",id:d,"desc":"Prefer patients younger than 15" }
      else if (stats[d]>50)  badge = {"title":"Respect Elders ",id:d,"desc":"Prefer patients older than 50" }
      if (badge !== null) b.push(badge)
    }
    return b
  },[])

  console.log(data)
  console.log(stats)

  return (
      <FlexContainer>
        <AutoMarginWrapper style={{maxWidth:1000}}>
          <QuestionBottom>Results</QuestionBottom>
        <MessageTop style={{textAlign:"center","marginBottom":50}}>
          ABOUT YOU..
        </MessageTop>
        <ResultPageFlex>
          {badges.map(obj=>(<Badge data={obj} key = {obj.id+"badge"}/>))}
        </ResultPageFlex>
        <MessageTop style={{textAlign:"center","marginBottom":50}}>
          YOU VS EVERYONE ELSE
        </MessageTop>
        <PlotContainer>
          {Object.keys(stats).map(d=>(
            <Plot
              key = {d + "Plot"}
              id = {d}
              you = {stats[d]}
              x1 = {0}
              x2 = {300}
              yt = {0}
              yb = {100}
            />


          ))}


        </PlotContainer>
        </AutoMarginWrapper>
      </FlexContainer>
    )
}
