import React,{Component} from 'react'
import {connect} from 'react-redux'
import {iconList as icons, translationList,featureList} from '../DilemmaMaker'
import {List,Card} from 'semantic-ui-react'
import { NodeGroup } from "react-move";
import { easeExpInOut } from 'd3-ease';
import {scaleLinear} from 'd3-scale'
import {maxBy, minBy} from 'lodash'
// class PersonDot extends Component{
//   render(){
//     const {x,y, r, subject} = this.props
//     return(
//       <circle cx={x} cy={y} r={r} fill={subject.label===1? "blue":"red"}>
//
//       </circle>
//     )
//   }
// }

const PopUp = ({loc,popUpInfo}) =>(
  <Card
    raised
    style={{
    position:"fixed",
    height:"auto",
    width:"150px",
    top:loc[1],
    left:loc[0],
    backgroundColor:"#ddd"
  }}>
  <Card.Content>
  <List divided  >
  {popUpInfo.map(d=>d)}
</List>
</Card.Content>
</Card>
)

class DataViz extends Component{
  constructor(props){
    super(props)

    const {features, randomChoices, labels} = props

    this.getSection = this.getSection.bind(this)
    const subjects = features.reduce((arr,d,i)=>{
        const newSet = d.map((p,j)=>{
          let subject =  {
            features:
            {...p,
            random:randomChoices[i],
            label:labels[i][j]}
          }

          return subject
        }
      )
      newSet[0].oppo = newSet[1].features
      newSet[1].oppo = newSet[0].features
      return [...arr,...newSet]
      },[]
    )


    // let chosenOnes = subjects.reduce((arr,d,i)=>{
    //   if (d.label === 0 || d.random === 1) return arr
    //   const {trial} = d
    //   let comp = {}
    //   for (let f in featureList){
    //     comp[f] =
    //   }
    //
    // })
    // let deniedOnes = []
    // let randomOnes = []

    // for (let subject of subjects){
    //
    // }
    this.state = {
      sections: [...Object.keys(featureList)],
      currentSection: 0,
      currentPosition:null,
      sectionHeight:1000,
      sectionWidth:600,
      radius:14,
      dotMargin:300,
      popUpLoc:[-9999,-9999],
      popUpInfo:[],
      subjects
    }
    this.sectionStyle = {
      height:this.state.sectionHeight,
      width:this.state.sectionWidth
    }
    this.getRelativeProp = this.getRelativeProp.bind(this)
    this.handleDotMouseOver = this.handleDotMouseOver.bind(this)
    this.getDistribution = this.getDistribution.bind(this)

  }

  componentDidMount() {
    this.getPosition()
    window.addEventListener('scroll', this.getSection)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getSection)
  }

  getSection(){

    this.setState({
      currentSection:Math.floor((window.pageYOffset+this.state.dotMargin)/this.state.sectionHeight),
      currentPosition:window.pageYOffset
    })
  }
  getPosition(){
   return window.pageYOffset
  }
  handleDotMouseOver({subject,popUpLoc}){
    const popUpInfo = subject === null? []: Object.keys(subject).map(d=>
      (<List.Item>
        <List.Icon>
          {icons[d]}
        </List.Icon>
        <List.Content>
          {translationList[d](subject[d])}
        </List.Content>
      </List.Item>)
    )
    this.setState({popUpLoc,popUpInfo})
  }
  getDistribution(){
    const {currentSection,sectionWidth,radius,sections,subjects} = this.state
    const data = this.getRelativeProp()
    const section = sections[currentSection]

    const {left,right} = data.reduce((obj,d,i)=>
      d[section]? {...obj,left:[...obj.left,d]} : {...obj,right:[...obj.right,d]}
    ,{left:[],right:[]})
    let dist =[
      ...left.map((d,i)=>{return {x:2.5*radius*i+radius,key:d.key,v:subjects[d.key].features[section],dom:true}}),
      ...right.map((d,i)=>{return {x:sectionWidth - (2.5*radius*i+radius),key:d.key,v:subjects[d.key].features[section],dom:false}})
    ]
    return dist
  }
  getRelativeProp(){
    const {section,subjects,sectionHeight, sectionWidth} = this.state
    const data = subjects.reduce((arr,{features,oppo},i)=>{
      if (features.label===0) return arr
      const newObj = Object.keys(features).reduce((obj,f)=>{
        if (f==="random")  obj[f] = features[f]
        else if (f==="name") obj[f] = features[f]
        else obj[f] = features[f]> oppo[f]
        return obj
      },{})
      arr.push(newObj)
      newObj.key = i
      return arr
    },[])

    return data


  }
  render(){
    const {sectionHeight, sections,sectionWidth,currentSection, radius,dotMargin,subjects,popUpLoc,popUpInfo} = this.state
    // const data = this.getRelativeProp()

    const dist = this.getDistribution()
    const max = maxBy(dist,o=>o.v)
    const min = minBy(dist,o=>o.v)
    const scale = scaleLinear().domain([min.v,max.v]).range([.5*radius,1.2*radius])
    console.log(max)
    return (
      <div  style={{
           width:  sectionWidth,
           height: sectionHeight*sections.length,
           margin: "0 auto"
       }}>
       <div
         style={{
           position:"fixed",
           top:dotMargin,
           width:600,
           height:600
         }}
         >
           <PopUp loc={popUpLoc} popUpInfo={popUpInfo}/>
           <svg width = "100%" height = "100%">
             <NodeGroup
               data={dist}
               keyAccessor={d=>`cir_${d.key}`}
               start={(d,i)=>({
                 opacity: [1e-6],
                 cx:1e-6,
                 cy:[radius*2.2],
                 r:[0],
                 fill:'black'
               })}
               enter={(d,i)=>({
                 opacity:[.6],
                 cx:[d.x],
                 cy:[radius*2.2],
                 r:[scale(d.v)],
                 fill:d.dom?"#116611":"#801515",
                 timing: { duration: 1000, ease: easeExpInOut }
               })}
               update={(d,i)=>({
                 opacity:[.6],
                 cx:[d.x],
                 cy:[radius*2.2],
                 r:[scale(d.v)],
                 fill:d.dom?"#116611":"#801515",
                 timing: { duration: 1000, ease: easeExpInOut }
               })}
               leave={(d,i)=>({
                 opacity:0,
                 fill: '#ff0063',
                 timing: { duration: 1000, ease: easeExpInOut }
               })}
               >
               {nodes=>{
                 return (
                   <g>
                     {
                       nodes.map(({key,data,state})=>{
                         return (
                           <circle key={key}
                             cx = {state.cx}
                             cy = {state.cy}
                             r = {state.r}
                             fill = {state.fill}
                             onMouseEnter={(e)=>this.handleDotMouseOver({subject:subjects[data.key].features,popUpLoc:[e.screenX,e.screenY+30]})}
                             onMouseLeave={(e)=>this.handleDotMouseOver({subject:null, popUpLoc:[-9999,-9999]})}
                           />
                         )
                       })
                     }
                   </g>
                 )
               }}
             </NodeGroup>
             {/* {dist.map((d,i)=>(
               <circle
                 // cx={20*i +8}
                 cx = {d.x}
                 cy={radius}
                 r={radius}
                 // fill={features.label===1? "blue":"red"}
                 key={`circle_${d.key}`}
                 onMouseEnter={(e)=>this.handleDotMouseOver({subject:subjects[d.key].features,popUpLoc:[e.screenX,e.screenY+30]})}
                 onMouseLeave={(e)=>this.handleDotMouseOver({subject:null, popUpLoc:[-9999,-9999]})}
             />)
           )} */}
           </svg>
       </div>

       {sections.map((d,i)=>(
         <div style={this.sectionStyle} key = {d}>
           <h2>{d}</h2>
           {(currentSection === i)? "current":"not"}
         </div>
       ))}

       </div>
    )
  }
}


const mapStateToProps = ({dec}) => {
    const {labels, features, randomChoices} = dec
    return {labels, features, randomChoices}
}

export default connect(mapStateToProps)(DataViz)
