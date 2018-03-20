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
  InstructionContainer
} from '../components/StyledComponents'
import {connect} from 'react-redux'
import DecisionPage from './DecisionPage'
import Carousel from 'nuka-carousel';
import {Icon,translationList} from '../Scenario'
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
         User ID
         <InputField placeholder = "email or username" type="text" value={this.state.uid} onChange={e=>this.handleChange("uid",e)} />
       </FormLabel>
       <FormLabel>
         trial id
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
  }

  render(){

    const modal = this.props.modal?
    (<ModalWrapper
      header = "The Kidney Exchange Problem"
      // text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      exitFn = {this.props.closeModal}
    >
    <Carousel>
      <InstructionContainer>
        <ModalText>[Introduction example] Who should get the kidney? You will be shown two patients, both in need a kidney of the same type. User ID and trial ID are optional. If no user id is entered, a random ID will be assigned in the database. 
        </ModalText>
        <ModalText> Press "Next" for more information.
        </ModalText>
      </InstructionContainer>
      <InstructionContainer>
      <ModalText>  [Explanation goes here] The number of dependents is represented by the icon. For instance, {translationList['dependents'](2)} means one elderly dependent, and  {translationList['dependents'](3)} means one young and one old.

      </ModalText>
      </InstructionContainer>
      <InstructionContainer>
        <ModalText>There are currently 20 preset scenarios. After 20 scenarios a summary of decisions and comparison will be given.
        </ModalText>
      </InstructionContainer>
      <InstructionContainer>
        <ModalText>Further explanation will be added.
        </ModalText>
      </InstructionContainer>
    </Carousel>
    <IntroForm beginSession = {this.props.beginSession}/>
  </ModalWrapper>)
    : null;
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
