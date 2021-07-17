import React from 'react';
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface DeliverOrderConfirmationDialogProps {
  onClose: () => void;
  open: boolean;
}

export const DeliverOrderConfirmationDialog: React.FC<DeliverOrderConfirmationDialogProps> =
  ({ onClose, open }) => {
    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Your Order is served</DialogTitle>
        <DialogContentText style={{ textAlign: 'center' }}>
          Thanks for using our app
        </DialogContentText>
        <Button
          onClick={() => onClose()}
          style={{ marginBottom: '5px' }}
          fullWidth
          color="primary"
        >
          Close
        </Button>
      </Dialog>
    );
  };
