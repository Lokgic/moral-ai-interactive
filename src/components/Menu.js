import React, { Component } from 'react';
import {Item, Container,Header} from 'semantic-ui-react'
import LinkContainer from './LinkContainer'

import {


  Link
} from 'react-router-dom'



 export default props =>(
      <div className = "flex-container">
      <Container className = "flex-auto-margin">
      <Header size ="large"
          dividing
        >Moral AI Prototypes</Header>
      <Item.Group divided>

        <LinkContainer
          external = "false"
          img ='./sequence1.png'
          title = 'Sequential Prototype 1'
          description = "Sequential"
          url = "/sequence1"
        />

      </Item.Group>
      </Container>
    </div>


    )
