import React, {Component} from 'react'
// import Table, { tb, td, th, tr } from 'material-ui/Table';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {Icon,translationList, featureNames} from '../Scenario'
import {ResultTableEl,ResultTableHead,ResultTableRow,ResultTableCell} from './StyledComponents'
const getURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/get-stat':'https://moralai.herokuapp.com/get-stat';

const getShit = async ()=> await fetch(getURL,{method:'get'})

const loading = (<FontAwesomeIcon
  icon={faSpinner}
  style={{width:"10px",height:"10px"}}
  spin
/>)




export default class ResultTable extends Component{
  constructor(props){
    super(props)
    const {features, labels, randomChoices} = props;
    const columns = ["scenario",
      "name","age","health","crime","drinking","dependents",
      "random(all)", "left(all)","right(all)","your decision","seconds(average)","seconds(you)"
                ]


    const rows = features.reduce((acc,d,i)=>{


      // out["your_decision"] = randomChoices[i]===1? 1: labels[i].indexOf(1) ;
      // out["inner"] = [{},{}]
      for (let person in d){
        // for (let feat in d[person]){
        //   out["inner"][person][feat] = d[person][feat]
        // }
        let cell ={}

        for (let feat of featureNames){

          cell[feat] = translationList[feat](d[person][feat])
        }
        cell["name"] = d[person].name
        acc.push(cell)
      }

      return acc;

    },[])


    this.state={rows,columns,stat:null,statReady:false}
  }
  componentDidMount(){
    const {labels, randomChoices, features,delay} = this.props
    getShit()
    .then((res) => { return res.json() })
    .then(d=>{
      // console.log(d)
      const stat = d.map((d,i)=>{
        const random = Math.round(d.random/d.total / 100 * 10000) + "%"
        const left = Math.round(d.left/d.total / 100 * 10000)
        const right = Math.round(100 - left) + "%"
        const decision = randomChoices[i]===1? "random": [`${features[i][0].name}(L)`,`${features[i][1].name}(R)`][labels[i]]
        const avgDelay = d.delay
        const yourDelay = delay[i]/1000
        return {
          random, left:left+"%", right , decision, avgDelay, yourDelay

        }
      })
      this.setState({stat,statReady:true})
      return d;
    })
  }
  render(){
    const {rows,columns,stat,statReady} = this.state
    // const {root,table} = this.props.classes
    const innerRowFeat = ["name","age","health","crime","drinking","dependents"]

    return rows===null?null:
    (
      <div>
      <ResultTableEl>
        <tbody>
        <ResultTableRow>


            {columns.map(d=><ResultTableHead key={`${d}_column`}>{d}</ResultTableHead>)}

        </ResultTableRow>

          {
            rows.map((row,ri)=>{
              const subI = ri%2
              const mainI = Math.floor(ri/2)
              const type = (mainI+1)%2===0?"a":"b"
            return  (
              <ResultTableRow key={`${ri}row`}>
                {subI===0?<ResultTableCell
                  type={type}
                  rowSpan="2"
                  >{mainI+1}</ResultTableCell>:null}
                {innerRowFeat.map(d=>
                  (<ResultTableCell
                      type={type}
                      key={`${d}_feat_${ri}`}
                    >{row[d]}</ResultTableCell>)
                )}
                {subI===0?
                    ["random","left","right","decision","avgDelay","yourDelay"].map(h=>(<ResultTableCell key={`${h}_cell${ri}`} type={type} rowSpan="2">{statReady?stat[mainI][h]:loading}</ResultTableCell>))
                  :null}
              </ResultTableRow>
            )}
          )
          }
      </tbody>
      </ResultTableEl>

    </div>
    )

  }
}

// ResultTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// withStyles(styles)(ResultTable);
