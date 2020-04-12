import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTableStyles } from '../../style';
import {Checkbox,Table,TableBody,TableCell,TableHead,TableRow,Typography,} from '@material-ui/core';
import {useTableSelectors} from './../../../../../handlers/customHook'
import { getInitials } from '../../../../helpers';

const TableList = ({list}) => {
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                   <TableCell>Rol</TableCell>
                  {/*<TableCell>Phone</TableCell>
                  <TableCell>Registration date</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(obj => (
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
                    <TableCell>
                        <Typography variant="body1">{obj.firstName}</Typography>
                    </TableCell>
                    <TableCell>{obj.email}</TableCell>
                    <TableCell>{obj.rol}</TableCell>
                    {/* <TableCell>
                      {obj.address.city}, {obj.address.state},{' '}
                      {obj.address.country}
                    </TableCell>
                    <TableCell>
                      {moment(obj.createdAt).format('DD/MM/YYYY')}
                    </TableCell> */}
                  </TableRow>
                ))}
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
