import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LandingPage } from 'pages/Landing';
import { ReportPage } from 'pages/Reports';
import { EmployeesPage } from 'pages/Employees';
import { SessionContext } from 'context/SessionContext';
import { ConditionalRoute } from 'components/ConditionalRoute';
import { Header } from 'components/Header';

import './App.scss';

const App: React.FC = () => {
  const {
    data: { sessionId },
  } = useContext(SessionContext);
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <ConditionalRoute
            path="/"
            exact
            canActivate={sessionId === undefined}
            redirectTo="/reports"
            component={LandingPage}
          />
          <ConditionalRoute
            path="/reports"
            exact
            canActivate={sessionId !== undefined}
            redirectTo="/"
            component={ReportPage}
          />
          <ConditionalRoute
            path="/employees"
            exact
            canActivate={sessionId !== undefined}
            redirectTo="/"
            component={EmployeesPage}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
