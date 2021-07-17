import React from 'react';
import { IconButton } from '@material-ui/core';
import { ClearTwoTone } from '@material-ui/icons';
import { useStyles } from './styles';

export interface ButtonCloseProps {
  onClick: () => void;
  isDark?: boolean;
}

export const ButtonClose: React.FC<ButtonCloseProps> = ({
  onClick,
  isDark,
}) => {
  const classes = useStyles({ isDark });
  return (
    <div className={classes.closeContainer}>
      <IconButton
        color="inherit"
        aria-label="delete"
        className={classes.closeButton}
        onClick={onClick}
      >
        <ClearTwoTone />
      </IconButton>
    </div>
  );
};
