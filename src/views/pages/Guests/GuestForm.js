import React from 'react';
import { withRouter } from 'react-router-dom';
import {getGuest} from '../../../services/Queries'
import {editGuest} from '../../../services/mutations'
import Form, {FormWithData} from '../../components/Form'
import {schema} from './GuestFormValidation'

const formConfig = {
  fields: [
    {
      key: 'firstName',
      label: 'Nombre',
      type:"text"
    },
    {
      key: 'letter',
      label: 'Carta',
      type:"text"
    },
    {
      key: 'status',
      label: 'Status',
      type:"select"
    },
  ],
  header: {
    title:'Crear un nuevo Guest',
    subtitle:'El e-mail es requerido para notifiaciones',
  }
}


const Guest = props => {
  const { history, match:{params:{id}} } = props;
  const root = '/guests'
  const handleComplete = () => history.push(root)
  const formProps = {
    root,
    history,
    schema,
    mutation:editGuest,
    config: !!id
      ? {
          ...formConfig,
          header: {title:'Editar Invitado', subtitle: 'No se puede modificar el correo'}
        }
      : formConfig,
  }
  return !!id //if we have an id, let's fetch the data for it.
    ? <FormWithData id={id} query={getGuest} {...formProps}/>
    : <Form {...formProps} done={handleComplete} />
};



export default withRouter(Guest)
