import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { AddTwoTone, RemoveTwoTone } from '@material-ui/icons';
import { useStyles } from './styles';

export interface QuantityButtonProps {
  onQuantityChange: (value: 1 | -1) => void;
  quantity: number;
  disabledAdd?: boolean;
  disabledRest?: boolean;
  size?: 'small' | 'medium';
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  onQuantityChange,
  quantity,
  disabledAdd,
  disabledRest,
  size,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.unitsContainer}>
      <IconButton
        disabled={disabledRest}
        onClick={() => onQuantityChange(-1)}
        size={size}
        data-testid="rest"
      >
        <RemoveTwoTone fontSize="small" />
      </IconButton>
      <Typography variant="body1">{quantity}</Typography>
      <IconButton
        disabled={disabledAdd}
        onClick={() => onQuantityChange(1)}
        size={size}
        data-testid="add"
      >
        <AddTwoTone fontSize="small" />
      </IconButton>
    </div>
  );
};
