import React from 'react';
import { Dialog, Typography } from '@material-ui/core';
import { ButtonClose } from 'pages/FoodMenu/components/Buttons/ButtonClose';
import PreparingFood from 'assets/image/preparing-food.gif';

interface PreparingOrderDialogProps {
  onClose: () => void;
  open: boolean;
}

export const PreparingOrderDialog: React.FC<PreparingOrderDialogProps> = ({
  onClose,
  open,
}) => {
  return (
    <Dialog
      keepMounted
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="Your Order"
      aria-describedby="Confirm your order"
    >
      <ButtonClose onClick={onClose} />
      <img
        alt="Preparing food"
        style={{ marginTop: '35px', width: '100%', height: 'auto' }}
        src={PreparingFood}
      />
      <Typography
        style={{ fontSize: '1.3rem', fontWeight: 700, textAlign: 'center' }}
      >
        We are preparing your order
      </Typography>
    </Dialog>
  );
};
