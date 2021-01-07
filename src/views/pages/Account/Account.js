import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, LinearProgress, Card, CardContent, CardHeader } from '@material-ui/core';
import {withAuthConsumer} from './../../../handlers/contexts/AuthStore';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { getUser } from '../../../services/Queries';
import { editUser } from '../../../services/mutations';
import CustomForm from '../../components/Form';
import { formConfig } from '../Users/UserForm';
import { schema } from '../Users/UserFormValidation';
import {flatterZero} from './../../../handlers/curries';

import {
  AccountProfile,
  Notifications,
  Password
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  title: {
    paddingBottom: 0
  },
  body: {
    paddingTop: 0
  }
}));

function Account({ user }) {
  const classes = useStyles();
  const formProps = {
    root:'/account',
    schema,
    mutation:editUser,
    config: {fields: formConfig(user.id).fields},
    styles : {
      backgroundColor: '#fff',
      marginH: 5
    }
  }
  const { loading, error, data, refetch } = useQuery(getUser, {variables: { id:user.id }})

  if (error) return <Redirect to={'/'} />;

  const preFormat = flatterZero(obj =>
    ({...obj, ...(!obj.birth && {birth: new Date('2000-08-18T21:11:54')})})
  ); //! export this

  return (
    <div className={classes.root}>
      { loading && <LinearProgress />}
      { data &&
        <Grid container spacing={4} >
        <Grid item lg={4} md={6} xl={4} xs={12} >
          <AccountProfile user={data.getUser}/>
          <Password />

        </Grid>

        <Grid item lg={8} md={6} xl={8} xs={12} >
          <Card>
            <CardHeader subheader="The information can be edited" title="Profile" className={classes.title} />
            <CardContent className={classes.body}>
              <CustomForm data={preFormat(data)} done={refetch} {...formProps} />
            </CardContent>
          </Card>
          <Notifications />
        </Grid>
        </Grid>
      }
    </div>
  );
};

export default withAuthConsumer(Account);
