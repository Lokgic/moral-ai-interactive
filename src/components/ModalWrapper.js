import React, {Component} from 'react'
import {
  ModalText,
  ExitModal,
  ModalContent,
  ModalBackground,
  ModalHeader
} from '../components/StyledComponents'
import ReactDOM from 'react-dom';


const modalRoot = document.getElementById('modal-root');


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

export default props=>(
  <Modal>
    <ModalBackground>
      <ModalContent>
           <ExitModal onClick={props.exitFn}>&#10005;</ExitModal>
           {props.header? (<ModalHeader>{props.header}</ModalHeader>):null}
           {props.text? <ModalText>{props.text}</ModalText>:null}
           {props.children}

      </ModalContent>
    </ModalBackground>
  </Modal>
)
