import React from 'react';
import List from '../../components/List'
import {allGuest} from '../../../services/Queries'

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
    {
      name:'status',
      label: 'Estado',
    }
  ]
}

const GuestList = () => {
  return (
    <List query={allGuest} config={tableFields}   />
  );
};

export default GuestList;
