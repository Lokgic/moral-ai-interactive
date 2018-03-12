import styled from 'styled-components';

export const QuestionTop = styled.h1`
  font-weight: 1000;
  text-align: justify;
  font-size: 1.5em;
  color:#177a9d;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-top:20px;

`

export const QuestionBottom = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 1000;
  text-align: left;
  font-size: 5em;
  color:#9d1748;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;

`


export const FlexContainer = styled.section`
    height:100vh;
    display:flex
`

export const FlexWrapper = styled.div`
    height:100%;
    display:flex
`

export const AutoMarginWrapper = styled.div`
  margin: auto;
`

export const MainViewContainer = styled.section`
      margin: 0 auto;
      min-width:1000px;
`

export const MessageContainer = styled.div`
  width:100%;
  margin:20px 0;

`


export const MessageTop = styled.h3`
  text-align: justify;
  font-size: 1em;
  color:black;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  margin-top:50px;
`

export const MessageBottom = styled.h3`
  font-weight: 300;
  text-align: justify;
  font-size: 1em;
  color:black;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  margin-top:5px;
`

export const StatBox = styled.div`
  display: flex;
  margin-left: 0px;
  width: 250px;
  font-size: 1em;
  flex-wrap:wrap;
  justify-content: center;

`
export const StatGroup = styled.div`
  margin: 10px;
  width 100%;
  display: flex;
`

export const StatTitle = styled.div`
  font-size: 0.6em;
  color:#dbd2c5;
  margin-bottom: 5px;


`

export const StatData = styled.div`
  font-size: 1.2em;
  color:#fffdde;
`

export const StatContent = styled.div`
  ${'' /* display:inline-block; */}


`

export const CardContainer = styled.div`
  display: flex;
`


export const PatientName = styled.div`
  font-family: 'Open Sans', sans-serif;
  margin: 5px 0 20px 5px;
  font-size: 1.2em;
  text-align: right;
  color:#dbd2c5;
  ${'' /* float:right; */}


`

export const PersonCardSty = styled.div`
  border-color: ${props => props.focused ? 'rgba(0, 0, 0, 0.5)' :'rgba(0, 0, 0, 0)'};
  width:40%;
  margin: auto;
  background: #608796;
  padding: 10px;
  border-radius: 0px;
  border-width: 20px;
  border-style: solid;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
             0 1px 5px 0 rgba(0, 0, 0, 0.12),
             0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor:pointer;
 &:hover {
   border-color: ${props => props.focused ? 'rgba(0, 0, 0, 0.5)' :'rgba(0, 0, 0, .2)'};
 }
`

export const CardHead = styled.span`
    ${'' /* display:inline-block; */}
    ${'' /* margin:auto */}
    float: right;

`



export const FeatureIcon = styled.div`
  display: inline-block;
  color: #fffdde;
  width:40px;
  height: 40px;
  margin-right: 15px;
  &: hover {
    color:white
  }
`

export const Divider = styled.hr`
margin: 1rem 0;
    line-height: 1;
    height: 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: rgba(0,0,0,.85);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color:
`

export const ButtonGroup = styled.div`
  ${'' /* display:flex;
  justify-content:space-evenly; */}
  max-width: 150px;
  order:2;
`

export const Button = styled.button`
  text-transform: uppercase;
  font-weight:1000;
  background: ${props => props.disabled ? 'rgba(255,255,255,.2)' : '#ccc'};
  color: ${props => props.disabled ? 'rgba(111,111,111,.2)' : '#9d1748'};
  height:50%;
  width:100%;
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  border-radius: 0px;
  border-width: 20px;
  border-style: solid;
  border-color: ${props => props.focused ? 'rgba(0, 0, 0, 0.5)' :'rgba(0, 0, 0, 0)'};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
             0 1px 5px 0 rgba(0, 0, 0, 0.12),
             0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor:pointer;
 &:hover {
   border-color: ${props => props.disabled? 'rgba(0, 0, 0, 0)':props.focused? 'rgba(0, 0, 0, 0.5)' :'rgba(0, 0, 0, .2)'};
 }
  cursor:${props => props.disabled ? 'not-allowed': 'pointer'};;
`;
