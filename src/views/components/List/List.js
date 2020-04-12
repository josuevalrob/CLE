import React from 'react';
import { useListStyles } from './style';
import PropTypes from 'prop-types';
import { Toolbar, TableList } from './components';
import { Card, CardActions, CardContent, TablePagination, LinearProgress} from '@material-ui/core';
import {usePagination} from './../../../handlers/customHook';
import { useQuery } from '@apollo/react-hooks';

const List = ({query}) => {
  //* Styles 💅🏻
  const classes = useListStyles();
  //* hooks 🎣
  const paginationHandlers = usePagination(10)
  const { loading, error, data } = useQuery(query)
  //* Curry 🍛
  //it allow me to add different handlers for different tables in the same component
  const withPagination = Pagination(paginationHandlers)
  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        {error && `Error : ${error}`}
        {loading && <LinearProgress /> }
        {data && withPagination(TableList, {list: Object.values(data)[0], classes})}
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
          count={props.list.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>

