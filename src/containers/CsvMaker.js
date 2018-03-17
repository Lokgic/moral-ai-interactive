import React,{Component} from "react"
import {csvFormat} from 'd3-dsv'
import {connect} from 'react-redux'

const getURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/get-dps':'https://moralai.herokuapp.com/get-dps';

const getShit = async ()=> await fetch(getURL,{method:'get'})

class CsvMaker extends Component{
  constructor(props){
    super(props)
    this.state = {csv:null}
  }
  componentDidMount(){
    const data = getShit()
              .then((res) => { return res.json() })
              .then((d) => {
                const headings = Object.keys(d[0])
                const newState = {headings:headings,data:d}

                let csvContent = "data:text/csv;charset=utf-8,";
                newState.data.forEach(function(rowArray){

                   let row = Object.values(rowArray).join(",");
                   csvContent += row + "\r\n";
                });
                var encodedUri = encodeURI(csvContent);
                this.setState({csv:encodedUri})
                 return d
                  });
  }
  render(){
    return this.state.csv === null? (<p>fetching...</p>)
    :<a href={this.state.csv} download="data.csv">
      Click here to download csv file
    </a>
  }
}




const mapDispatchToProps = dispatch => {
    return {

        getAllDps:()=>dispatch({type:"GET_ALL_DPS"}),

    }
}

const mapStateToProps = state => {

    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(CsvMaker)
