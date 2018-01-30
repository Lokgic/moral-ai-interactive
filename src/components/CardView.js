import React from 'react'
import styled from 'styled-components';
import UserIconRaw from 'react-icons/lib/fa/user'
import {
          Card,
          Image,
          List,
          Icon,
          Button,
          Transition,
          Loader
        } from 'semantic-ui-react'

import {iconList as icons, translationList,featureList} from '../DilemmaMaker'

import {
  CardContainer,
  PatientName,
  StyledUL,
  PersonCardSty,
  CardHead,
  CardDetails,
  FeatureIcon,
  StyledLi,
  Divider
} from './StyledComponents'


const UserIcon = styled(UserIconRaw)`
  width:120px;
  height:120px;
`

const PersonCard = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, chosen,showingFeatures,loc} = props

  return (



      <PersonCardSty>
      <CardHead>
        <UserIcon/>
        <PatientName>{name}</PatientName>
      </CardHead>

      <CardDetails>
        <StyledUL
          >

          {["age"].concat(showingFeatures).map((d,i)=>(

            <StyledLi key = {d}>
              <FeatureIcon>
                {icons[d]}
              </FeatureIcon>

              <div>
                {translationList[d](features[d])}
              </div>

            </StyledLi>
          ))}
        </StyledUL>
      </CardDetails>
    </PersonCardSty>


)}


export default props => {
  const {
        person,
        currentChosen,
        makeSelection,

        showingFeatures,

        icons
      } = props

  return (
    <CardContainer>
      {person.map((d,i)=>(
        <PersonCard
         person={d}
         chosen={currentChosen[i]}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}
         key={"personcard"+i}
         loc={i}
         />
      ))
    }
  </CardContainer>
  )
}
