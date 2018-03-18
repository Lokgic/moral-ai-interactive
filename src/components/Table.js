import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display:'flex'
  },
  table: {
    margin:'auto',
    width:'1000px'
  },
});

const TableWrapper = ({columns,data,classes})=>(
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        {columns.map(d=><TableCell key={`${d}_column`}>{d}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((n,i) => {
      return  (<TableRow key={"row"+i}>
        {columns.map(h=>(
            <TableCell key={`${n}_${h}`}>{n[h]}</TableCell>
        )
        )}
        </TableRow>)
      })}
    </TableBody>
  </Table>
)


Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableWrapper);
