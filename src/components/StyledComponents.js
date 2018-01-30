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

export const MainViewContainer = styled.section`
      margin: 0 auto;
      min-width:800px;
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

export const StyledUL = styled.ul`
  list-style: none;
  padding-left:0;
  width: 100%;
  margin: auto ;
  font-size: 1.3em;

`
export const StyledLi = styled.li`
  margin: 10px;
`

export const CardContainer = styled.div`
  display: flex;
`


export const PatientName = styled.h1`
  font-family: 'Open Sans', sans-serif;
  margin-top: 0;
  font-size: 3em;
  text-align: center;


`

export const PersonCardSty = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 10px 10px;
`

export const CardHead = styled.div`
    display:inline-block;
`

export const CardDetails = styled.div`
  display:inline-flex;
  width:100%;
`

export const FeatureIcon = styled.span`
  float: right;
  font-weight: 300;
  font-size: .7em;
  color:white;
  background-color: rgb(75,75,75);
  padding: 1px 5px;
`

export const Divider = styled.hr`
height: 10px;
	border: 0;
	box-shadow: 0 10px 10px -10px #8c8b8b inset;
`
