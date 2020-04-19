import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTableStyles } from '../../style';
import {Checkbox,Table,TableBody,TableCell,TableHead,TableRow,Typography,} from '@material-ui/core';
import {useTableSelectors} from './../../../../../handlers/customHook'

const TableList = ({list, config}) => {
  const classes = useTableStyles();
  const [selectedObj, handleSelectOne, handleSelectAll] = useTableSelectors(list)
  return (
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedObj.length === list.length}
                      color="primary"
                      indeterminate={
                        selectedObj.length > 0 &&
                        selectedObj.length < list.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {
                    config.columns.map(({label, name}) =>
                    <TableCell className={classes.headerCell} key={name}>{label}</TableCell>)
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(obj => {
                  return (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={obj.id}
                    selected={selectedObj.indexOf(obj.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedObj.indexOf(obj.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, obj.id)}
                        value="true"
                      />
                    </TableCell>
                    {
                      Object.keys(obj)
                        .filter(key => config.columns.map(({name}) => name).includes(key))
                        .map((key, i) =>
                          <TableCell key={i}>
                            { !!i //check is not the first element
                              ? obj[key]
                              : <Typography variant="body1">{obj[key]}</Typography>}
                          </TableCell>)
                    }
                    <TableCell className={classes.actions}>
                      { !!config.actions &&
                        config.actions.map((Component, i)=>
                        <Component key={i} id={obj.id} />)}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>

  );
};

TableList.propTypes = {
  list: PropTypes.array.isRequired
};

export default TableList;
