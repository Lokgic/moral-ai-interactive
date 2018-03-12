import React, {Component} from 'react'



import styled from 'styled-components';
import UserIconRaw from 'react-icons/lib/fa/user'
import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'
import { Icon,translationList,featureList} from '../Scenario'

import {
  CardContainer,
  PatientName,
  StatBox,
  PersonCardSty,
  CardHead,
  FeatureIcon,
  StatGroup,
  StatTitle,
  StatContent,
  StatData,
  Button,
  ButtonGroup,
  ProgressBar,
  Progress
} from './StyledComponents'

const iconStyle = {
  width:35,
  height:35
}

export const icons = {
    age: <CakeIcon style={iconStyle}/>,
    health: <HealthIcon style={iconStyle}/>,
    exercising: <RunnerIcon style={iconStyle}/>,
    dependents: <ChildIcon style={iconStyle}/>,
    drinking: <DrinkIcon style={iconStyle}/>
}





const UserIcon = styled(UserIconRaw)`
  width:70px;
  height:70px;
  fill:#fffdde;
  float: right;
`




class PersonCard extends Component{

  render(){
    const props = this.props
    const {features} = props.person
    const {name} = features
    const { chosen,mouseOver,mouseOverState,setCurrentChosen,loc} = props

    return (



        <PersonCardSty
          onClick={()=>setCurrentChosen(loc)}
          chosen={chosen}
          style = {loc===0?{order:1}:{order:3}}
          focused = {chosen}
          >

        <div>
        <CardHead>

          <UserIcon/>
          <PatientName>Patient {name}</PatientName>
        </CardHead>
      </div>

          <StatBox
            >

            {Object.keys(featureList).map((d,i)=>(

              <StatGroup key = {d}>



                <FeatureIcon
                  onMouseOver={()=>mouseOver(d)}
                  onMouseOut={()=>mouseOver("default")}
                  focused = {d===mouseOverState}
                  >
                  <Icon icon={d} style={iconStyle}/>
                </FeatureIcon>

                <StatContent>

                  <StatTitle>{featureList[d]}</StatTitle>
                  <StatData>{translationList[d](features[d])}</StatData>

                </StatContent>

              </StatGroup>
            ))}
          </StatBox>

      </PersonCardSty>


  )
  }
}


export default class CardView extends Component {
  constructor(props){
    super(props)
    this.handleConfirm = this.handleConfirm.bind(this)

  }
  handleConfirm(){


      if (this.props.currentRandom===1){
        this.props.makeSelection(Math.floor(Math.random() * 2),1)
      }else if  (this.props.currentChosen !== -1){
        this.props.makeSelection(this.props.currentChosen,0)
      }


  }
  render(){
    const {
          person,
          currentChosen,
          makeSelection,
          mouseOverState,
          showingFeatures,
          mouseOver,
          setCurrentChosen,
          setCurrentRandom,
          currentRandom,trial,percent
        } = this.props

    return (
      <CardContainer>
        {person.map((d,i)=>(
          <PersonCard
           person={d}
           chosen={currentChosen===i}
           makeSelection={makeSelection}
           showingFeatures={showingFeatures}
           key={"personcard"+i}
           loc={i}
           mouseOver={mouseOver}
           mouseOverState={mouseOverState}
           setCurrentChosen={setCurrentChosen}


           />
        ))
      }
      <ButtonGroup>
        <Button onClick={setCurrentRandom}
            focused = {currentRandom ===1}
            onMouseOver={()=>mouseOver("flipCoin")}
            onMouseOut={()=>mouseOver("default")}
            >
          Flip a coin
        </Button>
        <ProgressBar>
          <Progress percent = {percent}></Progress>
          {/* {trial.n-trial.index>0?<span style={{margin:'auto'}}>{trial.n-trial.index}</span>:null} */}
        </ProgressBar>
        <Button
          onClick={this.handleConfirm}
          onMouseOver={()=>mouseOver("confirm")}
          onMouseOut={()=>mouseOver("default")}
          disabled={currentRandom === 0 && currentChosen === -1}
          >
          Confirm
        </Button>
      </ButtonGroup>

    </CardContainer>
    )
  }

}
