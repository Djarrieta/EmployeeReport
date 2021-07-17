import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SessionProvider } from 'context/SessionContext';
import { theme } from 'styles';
import { GlobalErrorBoundary } from 'config/errors/GlobalErrorBoundary';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <GlobalErrorBoundary>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <App />
        </SessionProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
  document.getElementById('root'),
);
