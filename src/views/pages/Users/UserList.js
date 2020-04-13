import React from 'react';
import List from '../../components/List'
import {allUser} from '../../../services/Queries'
import {deleteUser} from '../../../services/mutations'
import {DeleteButton, LinkButton} from './../../components/ActionsButtons'
import { Button } from '@material-ui/core';

const tableFields = {
  actions : [
    ({id}) => <DeleteButton mutation={deleteUser} id={id}/>,
    ({id}) => <LinkButton url={`/user/edit/${id}`} />
  ],
  buttons: [
    () => <Button>Import</Button>,
    () => <Button>Export</Button>,
    () => <LinkButton url={`/user/add`} label='Añadir Usuario'/>
  ],
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
      name:'actions',
      label: 'Acciones',
    }
  ],
}
const UserList = () => (
  <List query={allUser}  config={tableFields}   />
)

export default UserList;
