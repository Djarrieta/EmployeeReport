import React from 'react';
import ReactDOM from 'react-dom';
import { SessionProvider } from 'context/SessionContext';
import { GlobalErrorBoundary } from 'config/errors/GlobalErrorBoundary';
import App from './App';

ReactDOM.render(
  <GlobalErrorBoundary>
    <SessionProvider>
      <App />
    </SessionProvider>
  </GlobalErrorBoundary>,
  document.getElementById('root'),
);
