import React from 'react';
import List from '../../components/List'
import {allUser} from '../../../services/Queries'
const tableFields = {
  columns : [
    {
      name:'firstName',
      label: 'Nombre',
    },
    {
      name:'email',
      label: 'E-Mail',
    },
    {
      name:'rol',
      label: 'Rol',
    },
  ]
}
const UserList = () => {
  return (
    <List query={allUser}  config={tableFields}   />
  );
};

export default UserList;
