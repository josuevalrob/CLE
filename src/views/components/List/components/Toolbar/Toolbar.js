import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useToolbarStyles } from '../../style';
import { SearchInput } from '../../../../components';

const Toolbar = ({className, buttons}) => {
  const classes = useToolbarStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        { buttons &&
          buttons.map((Btn, i) => <Btn key={i} className={classes.importButton} />)
        }
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
  className: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.func)
};

export default Toolbar;
