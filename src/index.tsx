import React from 'react';
import ReactDOM from 'react-dom';
import { SessionProvider } from 'context/SessionContext';
import App from './App';

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById('root'),
);
