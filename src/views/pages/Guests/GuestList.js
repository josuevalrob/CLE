import React from 'react';
import List from '../../components/List'
import {allGuest} from '../../../services/Queries'

const UserList = () => {
  return (
    <List query={allGuest}  />
  );
};

export default UserList;
