import React from 'react';
import {TurnosGrid} from  '../../../services/Queries'
import TurnoList from './TurnosList';
import { useQuery } from '@apollo/react-hooks';
import { LinearProgress } from '@material-ui/core';
import {flatterZero} from './../../../handlers/curries'

const TurnoPage = () => {
  const { loading, error, data } = useQuery(TurnosGrid);

  //* Return
  if(error) return <div>{error.message}</div>; //* error validation
  if (loading) return <LinearProgress />;
  return <TurnoList turnos={flatterZero(data)(d=>d)} />
}



export default TurnoPage