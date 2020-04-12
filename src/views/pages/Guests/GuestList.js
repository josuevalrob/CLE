import React from 'react';
import List from '../../components/List'
import {allGuest} from '../../../services/Queries'
import {deleteGuest} from '../../../services/mutations'
import {DeleteButton, EditButton} from './../../components/ActionsButtons'

const DeleteGuest = ({id}) => <DeleteButton mutation={deleteGuest} id={id}/>
const EditGuest = ({id}) => <EditButton url={`/guest/edit/${id}`} />

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
    }, 
    {
      name:'actions',
      label: 'Acciones',
    }
  ],
  actions : [EditGuest, DeleteGuest]
}

const GuestList = () => (<List query={allGuest} config={tableFields}   />);

export default GuestList;
