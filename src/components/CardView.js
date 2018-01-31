import React from 'react'
import styled from 'styled-components';
import UserIconRaw from 'react-icons/lib/fa/user'
// import {
//           Card,
//           Image,
//           List,
//           Icon,
//           Button,
//           Transition,
//           Loader
//         } from 'semantic-ui-react'

import {iconList as icons, translationList,featureList} from '../DilemmaMaker'

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
  AutoMarginWrapper
} from './StyledComponents'


const UserIcon = styled(UserIconRaw)`
  width:120px;
  height:120px;
  fill:#333;
`

const PersonCard = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, chosen,showingFeatures,loc} = props

  return (



      <PersonCardSty>
      <FlexWrapper>
      <CardHead>
        <UserIcon/>
        <PatientName>{name}</PatientName>
      </CardHead>
      </FlexWrapper>

        <StatBox
          >

          {["age"].concat(showingFeatures).map((d,i)=>(

            <StatGroup key = {d}>



              <FeatureIcon>
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
