import React, {Component} from 'react'
import QMark from 'react-icons/lib/fa/question-circle'

import CakeIcon from 'react-icons/lib/fa/birthday-cake'
import GenderIcon from 'react-icons/lib/fa/transgender-alt'
import DrinkIcon from 'react-icons/lib/md/local-drink'
import RunnerIcon from 'react-icons/lib/md/directions-run'
import HealthIcon from 'react-icons/lib/fa/heartbeat'
import ChildIcon from 'react-icons/lib/fa/child'
import CoinIcon from 'react-icons/lib/fa/adjust'
import ConfirmIcon from 'react-icons/lib/fa/arrow-circle-right'

const iconStyle = {margin:"0 5 0 0",width:30, height:30}

export const icons = {
    age: <CakeIcon style={iconStyle}/>,
    health: <HealthIcon style={iconStyle}/>,
    exercising: <RunnerIcon style={iconStyle}/>,
    dependents: <ChildIcon style={iconStyle}/>,
    drinking: <DrinkIcon style={iconStyle}/>,
    flipCoin: <CoinIcon style={iconStyle}/>,
    confirm:<ConfirmIcon style={iconStyle}/>
}



export const texts = {
    age: "Patient's current age",
    health: "The severity of additional health issues (if they exist)",
    exercising: "The average number of hours of cardiovascular each week",
    dependents: "The number of direct dependents of the patient",
    drinking:"Average number of drinks each day",
    flipCoin: "Can't decide? Use this option to leave the decision to chance.",
    confirm: "Confirm your decision."
}





export default  input=> Object.keys(texts).indexOf(input)===-1?
                          (<span>{<QMark style={iconStyle}/>}  Mouse over icon to see additional information</span>)
                          :(<span>{icons[input]}  {texts[input]}</span>)
