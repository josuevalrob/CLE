import React from 'react';
import List from '../../components/List'
import {allGuest} from '../../../services/Queries'
import {deleteGuest} from '../../../services/mutations'
import {DeleteButton, LinkButton} from './../../components/ActionsButtons'

const DeleteGuest = ({id}) => <DeleteButton mutation={deleteGuest} id={id}/>
const EditGuest = ({id}) => <LinkButton url={`/guest/edit/${id}`} label='Ediar'/>

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
  actions : [EditGuest, DeleteGuest],
  buttons: [
    () => <LinkButton url={`/guest/add`} label='Añadir Invitado'/>
  ],
}

const GuestList = () => (<List query={allGuest} config={tableFields}   />);

export default GuestList;
