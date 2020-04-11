import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from '../../../../helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const GuestsTable = props => {
  const { className, guests, ...rest } = props;

  const classes = useStyles();

  const [selectedGuests, setSelectedGuests] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { guests } = props;

    let selectedGuests;

    if (event.target.checked) {
      selectedGuests = guests.map(guest => guest.id);
    } else {
      selectedGuests = [];
    }

    setSelectedGuests(selectedGuests);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGuests.indexOf(id);
    let newSelectedGuests = [];

    if (selectedIndex === -1) {
      newSelectedGuests = newSelectedGuests.concat(selectedGuests, id);
    } else if (selectedIndex === 0) {
      newSelectedGuests = newSelectedGuests.concat(selectedGuests.slice(1));
    } else if (selectedIndex === selectedGuests.length - 1) {
      newSelectedGuests = newSelectedGuests.concat(selectedGuests.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedGuests = newSelectedGuests.concat(
        selectedGuests.slice(0, selectedIndex),
        selectedGuests.slice(selectedIndex + 1)
      );
    }

    setSelectedGuests(newSelectedGuests);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGuests.length === guests.length}
                      color="primary"
                      indeterminate={
                        selectedGuests.length > 0 &&
                        selectedGuests.length < guests.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Registration date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.slice(0, rowsPerPage).map(guest => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={guest.id}
                    selected={selectedGuests.indexOf(guest.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedGuests.indexOf(guest.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, guest.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={guest.avatarUrl}
                        >
                          {getInitials(guest.name)}
                        </Avatar>
                        <Typography variant="body1">{guest.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>
                      {guest.address.city}, {guest.address.state},{' '}
                      {guest.address.country}
                    </TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>
                      {moment(guest.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={guests.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

GuestsTable.propTypes = {
  className: PropTypes.string,
  guests: PropTypes.array.isRequired
};

export default GuestsTable;
