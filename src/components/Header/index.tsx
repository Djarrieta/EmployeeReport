import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import { SessionContext } from 'context/SessionContext';
import { deleteSession } from 'services/sessionService';

export const Header: FC = () => {
  const {
    data: { sessionId },
    mutations: { setUsername },
  } = useContext(SessionContext);

  const name = sessionId?.split(':::')[1];
  const history = useHistory();

  const signOut = () => {
    deleteSession();
    setUsername(undefined);
    history.push('/');
  };
  return (
    <div>
      <AppBar position="static">
        <Box display="flex" alignContent="space-between" width="100%">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <AccessAlarmIcon />
            </IconButton>
            <Typography variant="h6">
              <Link to="/reports">Reports</Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/employees">Employees</Link>
            </Typography>
          </Toolbar>
          {sessionId ? (
            <div>
              <span>{name}</span>
              <Button type="button" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Typography variant="h6">
              <Link to="/">Login</Link>
            </Typography>
          )}
        </Box>
      </AppBar>
    </div>
  );
};
