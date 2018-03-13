import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {ModalText,ExitModal,ModalContent,ModalBackground,ModalHeader,Form,InputField,InputSubmit,FormLabel} from '../components/StyledComponents'
import {connect} from 'react-redux'
import DecisionPage from './DecisionPage'

const modalRoot = document.getElementById('modal-root');

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
   this.props.beginSession(0)
   event.preventDefault();
 }

 render() {
   return (
     <Form onSubmit={this.handleSubmit}>

       <FormLabel>
         email
         <InputField type="text" value={this.state.uid} onChange={e=>this.handleChange("uid",e)} />
       </FormLabel>
       <FormLabel>
         trial id
         <InputField type="text" value={this.state.trial} onChange={e=>this.handleChange("trial",e)} />
       </FormLabel>
       <InputSubmit type="submit" value="Begin"/>
     </Form>
   );
 }
}


class Modal extends Component{
  constructor(props){
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Controller extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const modal = this.props.modal?
    (<Modal>
      <ModalBackground>

        <ModalContent>
             <ExitModal onClick={()=>this.props.closeModal()}>&#10005;</ExitModal>
          <ModalHeader>The Kidney Exchange Problem</ModalHeader>

          <ModalText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalText>
          <IntroForm beginSession = {this.props.beginSession}/>
        </ModalContent>
      </ModalBackground>
    </Modal>)
    : null;
    return (<div style={{overflow: 'hidden'}}>
            <DecisionPage/>
            {modal}
          </div>)
  }
}



const mapDispatchToProps = dispatch =>{
  return {
    closeModal:()=>dispatch({type:"SET_MODAL",value:0}),
    beginSession:value=>dispatch({type:"BEGIN_SESSION",value})
  }
}

const mapStateToProps = ({modal}) => {
    return {modal}
}

export default connect(mapStateToProps,mapDispatchToProps)(Controller)
