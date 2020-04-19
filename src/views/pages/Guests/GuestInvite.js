import React from 'react';
import { withRouter } from 'react-router-dom';
import {getGuestNoLetter} from '../../../services/Queries'
import {inviteGuest} from '../../../services/mutations'
import {FormWithData} from '../../components/Form'
import {schema} from './GuestFormValidation'

const formConfig = {
  fields: [
    {
      key: 'firstName',
      label: 'Nombre',
      type:"text", 
      disabled:true,
    },
    {
      key: 'owner.firstName',
      label: 'Gestor',
      type:"text",
      disabled:true,
    },
    {
      key: 'status',
      label: 'Estado',
      type:"text",
      disabled: true,
    },
    {
      key: 'rol',
      label: 'Rol/Tipo de usuario',
      type:"text",
      disabled: true,
    },
    {
      key: 'letter',
      label: 'Carta de invitación',
      type:"textArea"
    },
  ],
  header: {
    title: 'Invita al nuevo usuario',
    subtitle: 'Se amable y breve en la carta de presentación',
  }
}


const Guest = props => {
  const { history, match:{params:{id}} } = props;

  const formProps = {
    root: '/guests',
    history,
    schema,
    mutation: inviteGuest,
    config: formConfig,
  }
  return <FormWithData 
          id={id} 
          query={getGuestNoLetter} 
          {...formProps}
          dataHandler={arr => ({...arr, owner: arr.owner.id,})}
        />
};


export default withRouter(Guest)
