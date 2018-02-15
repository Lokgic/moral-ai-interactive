import React, {Component} from 'react'
import styled from 'styled-components';
import UserIconRaw from 'react-icons/lib/fa/user'
import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import GenderIcon from 'react-icons/lib/fa/transgender-alt'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'
import { translationList,featureList} from '../DilemmaMaker'

import {
  CardContainer,
  PatientName,
  StatBox,
  PersonCardSty,
  CardHead,
  CardDetails,
  FeatureIcon,
  StatGroup,
  Divider,
  FlexWrapper,
  StatTitle,
  StatContent,
  StatData,
  AutoMarginWrapper,
  Button,
  ButtonGroup
} from './StyledComponents'

const iconStyle = {
  width:45,
  height:45
}

export const icons = {
    age: <CakeIcon style={iconStyle}/>,
    health: <HealthIcon style={iconStyle}/>,
    exercising: <RunnerIcon style={iconStyle}/>,
    dependents: <ChildIcon style={iconStyle}/>,
    drinking: <DrinkIcon style={iconStyle}/>
}





const UserIcon = styled(UserIconRaw)`
  width:100px;
  height:100px;
  fill:#fffdde;
  float: right;
`




class PersonCard extends Component{

  render(){
    const props = this.props
    const {features} = props.person
    const {gender,name,age,img,} = features
    const {makeSelection, chosen,mouseOver,mouseOverState,setCurrentChosen,loc} = props

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
                  {icons[d]}
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
        this.props.makeSelection(Math.floor(Math.random() * 2))
      }else if  (this.props.currentChosen !== -1){
        this.props.makeSelection(this.props.currentChosen)
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
          icons,
          setCurrentChosen,
          setCurrentRandom,
          currentRandom
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
      <ButtonGroup style = {{order:2}}>
        <Button onClick={setCurrentRandom}
            focused = {currentRandom ===1}
            onMouseOver={()=>mouseOver("flipCoin")}
            onMouseOut={()=>mouseOver("default")}
            >
          Flip a coin
        </Button>
        <Button
          onClick={this.handleConfirm}
          onMouseOver={()=>mouseOver("confirm")}
          onMouseOut={()=>mouseOver("default")}
          >
          Confirm
        </Button>
      </ButtonGroup>

    </CardContainer>
    )
  }

}
