import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LandingPage } from 'pages/Landing';
import { ReportPage } from 'pages/Reports';
import { EmployeesPage } from 'pages/Employees';
import { SessionContext } from 'context/SessionContext';
import { ConditionalRoute } from 'components/ConditionalRoute';
import { Header } from 'components/Header';

import './App.scss';
import { Box, Container } from '@material-ui/core';

const App: React.FC = () => {
  const {
    data: { sessionId },
  } = useContext(SessionContext);
  return (
    <div className="app">
      <Router>
        <Header />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="justify"
          height="100%"
        >
          <Container maxWidth="sm" className="main">
            <Switch>
              <ConditionalRoute
                path="/"
                exact
                canActivate={sessionId === undefined}
                redirectTo="/Reports"
                component={LandingPage}
              />
              <ConditionalRoute
                path="/Login"
                exact
                canActivate={sessionId === undefined}
                redirectTo="/Reports"
                component={LandingPage}
              />
              <ConditionalRoute
                path="/Reports"
                exact
                canActivate={sessionId !== undefined}
                redirectTo="/"
                component={ReportPage}
              />
              <ConditionalRoute
                path="/Employees"
                exact
                canActivate={sessionId !== undefined}
                redirectTo="/"
                component={EmployeesPage}
              />
            </Switch>
          </Container>
        </Box>
      </Router>
    </div>
  );
};

export default App;
