import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';

export interface ConfirmationButtonProps {
  LeftElement: React.ReactElement;
  onClick: () => void;
  buttonLabel: string;
  disabled?: boolean;
}
export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  LeftElement,
  onClick,
  buttonLabel,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.actionContainer}>
      <div className={classes.actionContainerInner}>
        {React.cloneElement(LeftElement)}
        <Button
          color="primary"
          disabled={disabled}
          className={classes.button}
          variant="contained"
          onClick={() => {
            onClick();
          }}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
