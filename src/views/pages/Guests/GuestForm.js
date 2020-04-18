import React from 'react';
import { withRouter } from 'react-router-dom';
import {getGuest, allUser} from '../../../services/Queries'
import {editGuest, createGuest} from '../../../services/mutations'
import Form, {FormWithData} from '../../components/Form'
import {schema} from './GuestFormValidation'
import { useQuery } from '@apollo/react-hooks';
import { LinearProgress } from '@material-ui/core';

const formConfig = (id, admins) => ({
  fields: [
    {
      key: 'firstName',
      label: 'Nombre',
      type:"text"
    },
    {
      key: 'letter',
      label: 'Carta',
      type:"textArea"
    },
    {
      key: 'status',
      label: 'Status',
      type:"select",
      helper: 'Esta acción no enviará correo electrónicos',
      options: [
        {
          key: 'STANDBY',
          label: 'En espera'
        },
        {
          key: 'SEND',
          label: 'Enviado'
        },
        {
          key: 'ACCEPTED',
          label: 'Aceptado'
        },
        {
          key: 'DENIED',
          label: 'Denegado',
        },
        {
          key: 'DELETED',
          label: 'Eliminado',
        },
      ]
    },
    {
      key: 'owner',
      label: 'Gestor',
      type:"select",
      helper: 'Esta acción notificará vía mail, al nuevo Gestor',
      options: admins.map(obj => ({
        key: obj.id,
        label: `${obj.firstName} ${obj.lastName} - ${obj.email}`,
      }))
    },
  ],
  header: {
    title: !!id ? 'Editar Invitado' : 'Crear un nuevo Guest',
    subtitle: !!id ? 'No se puede modificar el correo' : 'El e-mail es requerido para notifiaciones',
  }
})


const Guest = props => {
  const { history, match:{params:{id}} } = props;
  const root = '/guests'
  const handleComplete = () => history.push(root)

  // ! THIS SHOULD BE A HOOK 🎣
  const { loading, error, data } = useQuery(allUser, {variables: { rol: 'admin' }})

  if(error) return <div>{error.message}</div>; //no user with admin rol

  if (loading) return <LinearProgress />;

  const formProps = {
    root,
    history,
    schema,
    mutation: !!id ? editGuest : createGuest,
    config: formConfig(id, Object.values(data)[0]),
  }

  return !!id //if we have an id, let's fetch the data for it.
  // edit guest
    ? <FormWithData id={id} query={getGuest} {...formProps}/>
  // new guest
    : <Form {...formProps} done={handleComplete} />
};



export default withRouter(Guest)
