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
  FormLabel} from '../components/StyledComponents'
import {connect} from 'react-redux'
import DecisionPage from './DecisionPage'


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




class Controller extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const modal = this.props.modal?
    (<ModalWrapper
      header = "The Kidney Exchange Problem"
      text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      exitFn = {this.props.closeModal}
    >
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
