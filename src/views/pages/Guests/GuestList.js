import React from 'react';
import List from '../../components/List'
import {allGuest} from '../../../services/Queries'
import {deleteGuest} from '../../../services/mutations'
import {DeleteButton, LinkButton} from './../../components/ActionsButtons'

const DeleteGuest = ({id}) => <DeleteButton mutation={deleteGuest} id={id}/>
const EditGuest = ({id}) => <LinkButton color='default' url={`/guest/edit/${id}`} label='Editar'/>
const InviteGuest = ({id}) => <LinkButton  url={`/guest/invite/${id}`} label='Invitar'/>

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
      name:'owner',
      label: 'Gestor asignado',
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
  actions : [InviteGuest, EditGuest, DeleteGuest],
  buttons: [
    () => <LinkButton url={`/guest/add`} label='Añadir Invitado'/>
  ],
}

const GuestList = () =>
  <List
    query={allGuest} 
    config={tableFields}
    dataHandler={data => 
      Object.values(data)[0]
        .map(obj => ({
          ...obj,
          owner: obj.owner
            ? obj.owner.firstName
            : 'No asignado'
        }))
    }
  />

export default GuestList;
