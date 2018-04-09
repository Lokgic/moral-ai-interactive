import React,{Component} from "react"
import {connect} from 'react-redux'
import {
  Form,
  InputField,
  InputSubmit,
  FormLabel
} from '../components/StyledComponents'
const getURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/get-dps':'https://moralai.herokuapp.com/get-dps';

const getShit = async ()=> await fetch(getURL,{method:'get'})

class CsvMaker extends Component{
  constructor(props){
    super(props)
    this.state = {csv:null,ok:"BycfRbMVJSEnPLWjg",passed:false,"input":''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const t = {
      left_1:"age",
      left_2:"health",
      left_3:"drinking",
      left_4:"crime",
      left_5:"dependents",
      right_1:"age",
      right_2:"health",
      right_3:"drinking",
      right_4:"crime",
      right_5:"dependents",
    }
    const data = getShit()
              .then((res) => { return res.json() })
              .then((data) => {
                const headings = Object.keys(data[0])

                const headingsCSV = headings
                                    .map(d=>Object.keys(t).indexOf(d) !== -1? t[d]:d)
                                    .join(",");
                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += headingsCSV + "\r\n";
                data.forEach(function(rowArray){

                   let row = headings.map(h=>rowArray[h])
                                      .join(",");
                   csvContent += row + "\r\n";
                });
                var encodedUri = encodeURI(csvContent);
                this.setState({csv:encodedUri})
                 return data
                  });
  }
  handleChange(event) {
   this.setState({input:event.target.value})
 }

 handleSubmit(event) {

   if (this.state.ok === this.state.input){
     this.setState({passed:true})
   }
   event.preventDefault();
 }
  render(){

    if (!this.state.passed){
      return (
        <Form  onSubmit={this.handleSubmit}>
          <FormLabel>Hello there</FormLabel>
          <InputField type="password" onChange={this.handleChange}/>
          <InputSubmit type="submit" value="Hello"/>

        </Form>
      )
    } else{
      return this.state.csv === null? (<p>fetching...</p>)
      :<a href={this.state.csv} download="data.csv">
        Click here to download csv file
      </a>
    }


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
