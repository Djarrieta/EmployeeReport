import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { SpeakerNotes } from '@material-ui/icons';
import { SessionContext } from 'context/SessionContext';
import { deleteSession } from 'services/sessionService';
import { HeaderElement } from './HeaderElement';

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
    <AppBar position="static">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="justify"
        width="100%"
      >
        <Toolbar>
          {sessionId ? (
            <>
              <HeaderElement name="Reports" path="/Reports" />
              <HeaderElement name="Employees" path="/Employees" />
              <Button type="button" onClick={signOut}>
                <HeaderElement name={name ?? ''} path="/" />
              </Button>
            </>
          ) : (
            <HeaderElement name="Login" path="/Login" />
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};
