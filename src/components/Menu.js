import React, { Component } from 'react';
import {Item, Container,Header} from 'semantic-ui-react'
import LinkContainer from './LinkContainer'

import {


  Link
} from 'react-router-dom'



 export default props =>(
      <div className = "app-container">
      <Container className = "main-container">
      <Header size ="large"
          dividing
        >Moral AI Prototypes</Header>
      <Item.Group divided>

        <LinkContainer
          external = {true}
          img ='./imgs/htmldemo.png'
          title = 'Sequential Prototype 1'
          description = "Sequential"
          url = "/sequence1"
        />

      </Item.Group>
      </Container>
    </div>


    )
