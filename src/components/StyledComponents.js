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
  font-weight: 1000;
  font-style: bold;
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
  margin-top:20px;
`

export const MessageBottom = styled.h3`
  font-weight: 300;
  text-align: justify;
  font-size: 1em;
  color:grey;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0;
  margin-top:5px;
`

export const StatBox = styled.div`
  display: flex;
  margin-left: 50px;
  width: 250px;
  font-size: 1.3em;
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
  color:#777;
  margin-bottom: 5px;


`

export const StatData = styled.div`
  font-size: 1.2em;
  color:#333;
`

export const StatContent = styled.div`
  ${'' /* display:inline-block; */}


`

export const CardContainer = styled.div`
  display: flex;
`


export const PatientName = styled.div`
  font-family: 'Open Sans', sans-serif;
  margin-top: 0;
  font-size: 3em;
  text-align: center;
  color:#333;


`

export const PersonCardSty = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 10px 10px;
  background-color: #b4b4b4;
  padding: 30px;
  border-radius: 20px;
`

export const CardHead = styled.div`
    ${'' /* display:inline-block; */}
    margin:auto
`

export const CardDetails = styled.div`
  ${'' /* display:inline-flex; */}
  ${'' /* width:100%; */}
`

export const FeatureIcon = styled.div`
  display: inline-block;
  color:#333;
  width:50px;
  height: 50px;
  margin-right: 15px;
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
