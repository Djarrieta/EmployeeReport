import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { SessionProvider } from 'context/SessionContext';
import { GlobalErrorBoundary } from 'config/errors/GlobalErrorBoundary';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <GlobalErrorBoundary>
      <SessionProvider>
        <App />
      </SessionProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
  document.getElementById('root'),
);
