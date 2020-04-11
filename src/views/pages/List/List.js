import React, { useState } from 'react';
import { useListStyles } from './style';
import PropTypes from 'prop-types';
import { Toolbar, TableList } from './components';
import { Card, CardActions, CardContent, TablePagination} from '@material-ui/core';
import { Query } from 'react-apollo'
import {allGuest} from './../../../services/Queries'

const List = ({history}) => {
  //* Styles 💅🏻
  const classes = useListStyles();
  //* hooks 🎣
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  //* handlers 🛠
  const handlePageChange = (_, page) => setPage(page);
  const handleRowsPerPageChange = event => setRowsPerPage(event.target.value);
  //* Curry 🍛
  //it allow me to add different handlers for different tables in the same component
  const withPagination = Pagination({rowsPerPage, page, handlePageChange, handleRowsPerPageChange})

  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        <Query query={allGuest} >
          {({loading, error, data}) => {
            console.log(data)
            if(error) return `Error : ${error}`
            if(loading) return `Loading ...`
            return  withPagination(TableList, {users: data.getClientes, classes})
          }}
        </Query>
      </div>
    </div>
  );
};

List.propTypes = {
  history: PropTypes.object
};

export default List;

const Pagination = ({rowsPerPage, page, handlePageChange, handleRowsPerPageChange}) => 
  (Table, props) =>
    <Card className={props.classes.root} >
      <CardContent className={props.classes.content}>
        <Table {...props}/>
      </CardContent>
      <CardActions className={props.classes.actions}>
        <TablePagination
          component="div"
          count={props.users.length} //! this shuold be dinamic
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>