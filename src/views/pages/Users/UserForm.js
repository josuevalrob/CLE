import React from 'react';
import { withRouter } from 'react-router-dom';
import {getUser} from '../../../services/Queries'
import {editUser} from '../../../services/mutations'
import CustomForm, {FormWithData} from '../../components/Form'
import {schema} from './UserFormValidation'

export const formConfig = id => ({
  fields: [
    {
      key: 'firstName',
      label: 'Nombre',
      type:"text"
    },
    (!id ? {
      key: 'email',
      label: 'Correo Electrónico',
      disabled: !!id,
      type:"text"
    } : {}),
    (!id ? { //id just for creating a new user.
      key: 'password',
      label: 'Contraseña',
      type:"password"
    } : {}),
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
      type:"date"
    },
    {
      key: 'profilePhoto',
      label: 'Avatar',
      type:"text"
    },

  ],
  header: {
    title: !!id ? 'Editar Usuario' :'Crear un nuevo Usuario',
    subtitle: !!id ? 'No se puede modificar el correo' :'El e-mail es requerido para notifiaciones',
  }
})


const UserForm = props => {
  const { history, match:{params:{id}} } = props;
  const handleComplete = () => history.push('/users')
  const formProps = {
    root:'/users',
    history,
    schema,
    mutation:editUser,
    config: formConfig(id),
  }
  return !!id //if we have an id, let's fetch the data for it.
    ? <FormWithData id={id} query={getUser} dataHandler={obj => {
        return {...obj, ...(!obj.birth && {birth: new Date('2000-08-18T21:11:54')})}
      }} {...formProps}/>
    : <CustomForm {...formProps} done={handleComplete} />
};



export default withRouter(UserForm)
