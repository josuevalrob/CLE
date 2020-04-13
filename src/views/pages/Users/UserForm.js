import React from 'react';
import { withRouter } from 'react-router-dom';
import {getUser} from '../../../services/Queries'
import {editUser} from '../../../services/mutations'
import Form, {FormWithData} from '../../components/Form'
import {schema} from './UserFormValidation'

const formConfig = {
  fields: [
    {
      key: 'firstName',
      label: 'Nombre',
      type:"text"
    },
    {
      key: 'email',
      label: 'Correo Electrónico',
      type:"text"
    },
    {
      key: 'password',
      label: 'Contraseña',
      type:"password"
    },
    {
      key: 'lastName',
      label: 'Apellido',
      type:"text"
    },
    {
      key: 'phone',
      label: 'Teléfono',
      type:"text"
    },
    {
      key: 'Country',
      label: 'Pais',
      type:"text"
    },

    {
      key: 'City',
      label: 'Ciudad',
      type:"text"
    },
    {
      key: 'birth',
      label: 'Fecha de Nacimiento',
      type:"text"
    },
    {
      key: 'profilePhoto',
      label: 'Avatar',
      type:"text"
    },

  ],
  header: {
    title:'Crear un nuevo Usuario',
    subtitle:'El e-mail es requerido para notifiaciones',
  }
}


const Guest = props => {
  const { history, match:{params:{id}} } = props;
  const handleComplete = () => history.push('/users')
  const formProps = {
    history,
    schema,
    mutation:editUser,
    config: !!id
      ? {
          ...formConfig,
          header: {title:'Editar Usuario', subtitle: 'No se puede modificar el correo'}
        }
      : formConfig,
  }
  return !!id //if we have an id, let's fetch the data for it.
    ? <FormWithData id={id} query={getUser} {...formProps}/>
    : <Form {...formProps} done={handleComplete} />
};



export default withRouter(Guest)
