import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { SpeakerNotes, SupervisorAccount, ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const HeaderElement = (props: {
  name: string;
  path: string;
  handleClick: undefined | (() => void);
}): JSX.Element => {
  const { name, path, handleClick } = props;

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="SpeakerNotes"
      onClick={handleClick ? () => handleClick() : undefined}
    >
      <Link to={path}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {path === '/Reports' && <SpeakerNotes />}
          {path === '/Employees' && <SupervisorAccount />}
          {path === '/Login' && <ExitToApp />}
          {path === '/' && <ExitToApp />}
          <Typography variant="subtitle2">{name}</Typography>
        </Box>
      </Link>
    </IconButton>
  );
};
