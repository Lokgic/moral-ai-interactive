import React, {Component} from 'react'
import {ModalText,InstructionContainer} from '../components/StyledComponents'

const text =
  [
    "You will be shown two patients, both in need of the same kidney, and you will have to decide how to allocate the kidney. From your decisions for 20 scenarios we will give you your: ",
  "Individual Preference Model: that predicts the relative weights you place on each feature when making a decision.",
    "Cluster: of We Robot participants who make similar decisions. On 4/14 you may pick up the sticker that corresponds with your cluster (these will be fun, we promise!). We will also reveal our We Robot 2018 Clusters Visualization 2D Plot and Dendrogram to see where you are on the figures and find others (you will be identified based on the Display Name you give or will get an anonymous ID# if you leave it blank).",
  "The information you provide here will be analyzed anonymously and will not be used for publication. Only you will have access to your individual preference model, and you may choose to reveal your results to a small group during our presentation, but you will not be required to do so.",
  "Your email will only be used to connect your data and send you your results.",
    "Display Name: Name you want displayed on the WeRobot 2018 cluster graph. If you want to be anonymous just leave this blank and we will give you an ID that you can use to find yourself and still get a sticker, but others won’t be able to find you."
]



export default props=>(
    <InstructionContainer>
      {text.map((d,i)=>(<ModalText key={`weRobotText${i}`}>{d}</ModalText>))}
    </InstructionContainer>
)
