import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTableStyles } from '../../style';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { getInitials } from '../../../../helpers';

const TableList = ({list}) => {
  const classes = useTableStyles();

  // ! should be a hook 🎣
  const [selectedObj, setSelectedObj] = useState([]);
  // ! should be a hook 🎣
  const handleSelectAll = event => {
    let selectedObj;
    if (event.target.checked) {
      selectedObj = list.map(guest => guest.id);
    } else {
      selectedObj = [];
    }
    setSelectedObj(selectedObj);
  };
  // ! should be a hook 🎣
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedObj.indexOf(id);
    let newSelectedObj = [];

    if (selectedIndex === -1) {
      newSelectedObj = newSelectedObj.concat(selectedObj, id);
    } else if (selectedIndex === 0) {
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(1));
    } else if (selectedIndex === selectedObj.length - 1) {
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedObj = newSelectedObj.concat(
        selectedObj.slice(0, selectedIndex),
        selectedObj.slice(selectedIndex + 1)
      );
    }

    setSelectedObj(newSelectedObj);
  };


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
                  {/* <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell>
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
                      <div className={classes.nameContainer}>
                          {getInitials(obj.firstName)}
                      </div>
                        <Typography variant="body1">{obj.firstName}</Typography>
                    </TableCell>
                    <TableCell>{obj.email}</TableCell>
                    {/* <TableCell>
                      {obj.address.city}, {obj.address.state},{' '}
                      {obj.address.country}
                    </TableCell>
                    <TableCell>{obj.phone}</TableCell>
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
  className: PropTypes.string,
  list: PropTypes.array.isRequired
};

export default TableList;
