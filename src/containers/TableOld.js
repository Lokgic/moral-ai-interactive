import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const getURL = process.env.NODE_ENV ==="development"? 'http://localhost:5000/get-dps':'https://moralai.herokuapp.com/get-dps';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display:'flex'
  },
  table: {
    margin:'auto'
  },
});

const getShit = async ()=> await fetch(getURL,{method:'get'})

class DataTable extends Component{
  constructor(props){
    super(props)
    this.state = {headings:null,data:null}
  }
  componentDidMount(){
    const data = getShit()
              .then((res) => { return res.json() })
              .then((d) => {
                const headings = Object.keys(d[0])
                const newState = {headings:headings,data:d}
                // console.log(newState)
                this.setState(newState)
                 return d
                  });
  }
  render(){

      const classes = this.props.classes
      const {headings,data} = this.state
      console.log(classes)
      return headings === null?null:(
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headings.map(d=><TableCell key={`${d}_heading`}>{d}</TableCell>)}

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((n,i) => {
              return  (<TableRow key={"row"+i}>
                {headings.map(h=>(

                    <TableCell key={`${n}_${h}`}>{n[h]}</TableCell>

                )
                )}
                </TableRow>)

              })}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }




DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
