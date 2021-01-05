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
  const treatData = flatterZero(treatTurnosGrid);
  return <TurnoList turnos={treatData(data)} />
}



export default TurnoPage

const treatTurnosGrid = data => data.map(obj=>({
  ...obj,
  duration: `${restDays(obj.dates)} días`
}))

const restDays = ([start, end]) => Math.floor(
  (end.value - start.value) / (1000 * 3600 * 24)
)