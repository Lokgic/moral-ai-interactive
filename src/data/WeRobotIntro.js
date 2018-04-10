import React, { Component } from 'react';
import {
  ModalText,
  InstructionContainer
} from '../components/StyledComponents';

const text = [
  'Background: In a kidney exchange, patients in need of a kidney transplant who have a willing but medically incompatible donor can attempt to exchange their donors. Determining the optimal way to match patients and donors is a computationally challenging problem, for which algorithms developed in the AI community are already being used. Most commonly, exchanges try to maximize the total number of transplants. Many exchanges also prioritize patients based on medical criteria (e.g., quality of the match) and ethical priorities (e.g., patient age, prior organ donation, etc.). Designing these policies is a morally challenging and contentious process, and there is often disagreement between various stakeholders.',
  'Who Should Get The Kidney? To explore the moral challenges posed by kidney exchange, the Moral AI project is asking you (one set of stakeholders) what the ethical priorities of kidney exchange should be. When you visit our interface you will be asked to allocate a kidney between two patients who vary across several features. You also have the option to flip a coin, but please do your best to make a decision. From your decisions for 20 scenarios we will give you your:',
  'Individual Preference Model: that predicts the relative weights you place on each feature when making a decision.',
  'Cluster: of We Robot participants who make similar decisions. On 4/14 you may pick up the sticker that corresponds with your cluster (these will be fun, we promise!). We will also reveal our We Robot 2018 Clusters Visualization to see where you are on the figures and find others.',
  'Disclosure: The information you provide here will be analyzed anonymously and will not be used for publication. You may reveal your results to a small group during our presentation, but you will not be required to do so.',
  'Email: This will be used to connect your responses to your email address so that your results can be sent to you. ',
  'Display Name: Name you want displayed on the WeRobot 2018 cluster graph. If you want to be anonymous just leave this blank and we will give you an ID that you can use to find yourself and still get a sticker, but others won’t be able to find you.'
];

export default props => (
  <InstructionContainer>
    {text.map((d, i) => <ModalText key={`weRobotText${i}`}>{d}</ModalText>)}
  </InstructionContainer>
);
