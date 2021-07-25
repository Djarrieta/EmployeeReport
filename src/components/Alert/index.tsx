import { Snackbar } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

export const Alert: FC = () => {
  const {
    alert,
    mutations: { setAlert },
  } = useContext(SessionContext);

  if (alert === '') {
    return <></>;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={alert !== undefined}
      autoHideDuration={3000}
      onClose={() => setAlert('')}
      message={alert}
    />
  );
};
