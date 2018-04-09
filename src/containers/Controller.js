import React, {Component} from 'react'
import ModalWrapper from '../components/ModalWrapper'
import {
  ModalText,
  ExitModal,
  ModalContent,
  ModalBackground,
  ModalHeader,
  Form,
  InputField,
  InputSubmit,
  FormLabel,
  InstructionContainer,
  ExplanationContainer,
  ExpCard,
  ExpText
} from '../components/StyledComponents'
import {connect} from 'react-redux'
import DecisionPage from './DecisionPage'
import Carousel from 'nuka-carousel';
import {Icon,translationList,featureNames,featureExplanation} from '../Scenario'
import WeRobotIntro from '../data/WeRobotIntro'



class IntroForm extends Component{
  constructor(props){
    super(props);
    this.state = {trial: '',uid:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(type,event) {
   this.setState({[type]:event.target.value})
 }

 handleSubmit(event) {
   this.props.beginSession(this.state.uid, this.state.trial);
   event.preventDefault();
 }

 render() {
   return (
     <Form onSubmit={this.handleSubmit}>

       <FormLabel>
         Email
         <InputField placeholder = "email" type="text" value={this.state.uid} onChange={e=>this.handleChange("uid",e)} />
       </FormLabel>
       <FormLabel>
         display name
         <InputField
           type="text"
           value={this.state.trial}
           onChange={e=>this.handleChange("trial",e)}
           placeholder="optional"
         />
       </FormLabel>
       <InputSubmit type="submit" value="Begin"/>
     </Form>
   );
 }
}


const  iconSty = {"height":"15x","weight":"15px"}


class Controller extends Component {
  constructor(props){
    super(props);
    console.log(props)

  }

  render(){
    const {weRobot} = this.props
    const Intro =   (<ModalWrapper
        header = "Who should get the kidney? "
        exitFn = {this.props.closeModal}
        // contentStyle = {{  width:'300px'}}
      >
      { weRobot?
           <WeRobotIntro/>:
        <InstructionContainer>
          <ModalText>Who should get the kidney? You will be shown two patients, both in need the same kidney, and you get to decide who gets it. After a number of scenarios, you will see a summary of your judgements and how it compares to others. Enter a user name and a trial ID (optional) to begin.
          </ModalText>
        </InstructionContainer>}
      <IntroForm beginSession = {this.props.beginSession}/>
    </ModalWrapper>)
    const Exp = (
      <ModalWrapper
        header = "Categories"
        exitFn = {this.props.closeModal}>

        <ExplanationContainer>

          {featureNames.map(d=>{
            return (
              <ExpCard key={`expCard_${d}`}>
                <h3
                  style={{  textAlign: 'center'}}
                  >{d}</h3>
                <Icon
                  icon={d}
                  style={
                    {
                      width:30,
                      height:30,
                      margin:"auto"
                    }
                    }/>
                <ExpText>
                  {featureExplanation[d]}
                </ExpText>
              </ExpCard>)
          })}
        </ExplanationContainer>

      </ModalWrapper>
    )
    let modal
    switch(this.props.modal){
      case 1:
        modal = Intro;
        break;
      case 2:
        modal = Exp;
        break;
      default:
        modal = null
    }
    // const modal = this.props.modal?
    // Intro
    // : null;


    return (<div>
            <DecisionPage/>
            {modal}
          </div>)
  }
}



const mapDispatchToProps = dispatch =>{
  return {
    closeModal:()=>dispatch({type:"SET_MODAL",value:0}),
    beginSession:(uuid,trial)=>dispatch({type:"BEGIN_SESSION",uuid,trial})
  }
}

const mapStateToProps = ({modal}) => {
    return {modal}
}

export default connect(mapStateToProps,mapDispatchToProps)(Controller)
