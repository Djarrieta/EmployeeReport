import React from 'react';
import ReactDOM from 'react-dom';
import { SessionProvider } from 'context/SessionContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'styles';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ThemeProvider>,

  document.getElementById('root'),
);
