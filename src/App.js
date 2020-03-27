import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './views/helpers';
import theme from './views/theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './handlers/common/validators';
import Routes from './handlers/Routes';
import Client from './services/apolloClient'
import { ApolloProvider } from 'react-apollo';
import { AuthStore } from './handlers/contexts/AuthStore';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={Client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter history={browserHistory} basename={process.env.PUBLIC_URL}>
            <AuthStore>
              <Routes />
            </AuthStore>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
