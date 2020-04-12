import React from 'react';
import List from '../../components/List'
import {allUser} from '../../../services/Queries'

const GuestList = () => {
  return (
    <List query={allUser}  />
  );
};

export default GuestList;
