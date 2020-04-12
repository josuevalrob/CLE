import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useToolbarStyles } from '../../style';
import { Button } from '@material-ui/core';
import { SearchInput } from '../../../../components';

const Toolbar = props => {
  const { className, ...rest } = props;

  const classes = useToolbarStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add guest
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search guest"
        />
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
