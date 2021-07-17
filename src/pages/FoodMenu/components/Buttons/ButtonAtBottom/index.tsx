import React from 'react';
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import currencyFormatter from 'currency-formatter';
import { useStyles, StyledBadge } from './styles';

export interface ButtonAtBottomProps {
  badgeNumber: number;
  text: string;
  amount: number;
  zIndex: number;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonAtBottom: React.FC<ButtonAtBottomProps> = ({
  zIndex,
  badgeNumber,
  amount,
  text,
  onClick,
  disabled,
}) => {
  const classes = useStyles({ zIndex });
  return (
    <div className={classes.container}>
      <div className={classes.containerInner}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableRipple
          disabled={disabled}
          disableElevation
          onClick={onClick}
          fullWidth
        >
          <StyledBadge badgeContent={badgeNumber} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
          <span>{text}</span>
          <span>{currencyFormatter.format(amount, { code: 'USD' })}</span>
        </Button>
      </div>
    </div>
  );
};
