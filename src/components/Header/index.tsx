import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { SessionContext } from 'context/SessionContext';
import { deleteSession } from 'services/sessionService';
import { HeaderElement } from './HeaderElement';

export const Header: FC = () => {
  const {
    data: { sessionId },
    mutations: { setUsername, setAlert },
  } = useContext(SessionContext);

  const name = sessionId?.split(':::')[1];
  const history = useHistory();

  const signOut = () => {
    deleteSession();
    setUsername(undefined);
    history.push('/');
    setAlert('See you next time.');
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
              <HeaderElement
                name="Reports"
                path="/Reports"
                handleClick={undefined}
              />
              <HeaderElement
                name="Employees"
                path="/Employees"
                handleClick={undefined}
              />
              <HeaderElement name={name ?? ''} path="/" handleClick={signOut} />
            </>
          ) : (
            <HeaderElement name="Login" path="/Login" handleClick={undefined} />
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};
