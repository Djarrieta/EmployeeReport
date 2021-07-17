import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { ButtonClose } from 'pages/FoodMenu/components/Buttons/ButtonClose';
import { FoodImage } from 'pages/FoodMenu/components/FoodImage';
import { useStyles } from './styles';

export interface ConfirmAddBaseDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  coverImage: string;
  price: string;
  imgHeight: string;
  imgPosition: string;
}

export const ConfirmAddBaseDialog: React.FC<ConfirmAddBaseDialogProps> = ({
  open,
  onClose,
  description,
  coverImage,
  title,
  price,
  children,
  imgHeight,
  imgPosition,
}) => {
  const classes = useStyles({ imgPosition, imgHeight });
  return (
    <Dialog
      keepMounted
      fullScreen
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
      aria-labelledby="Confirm food selection"
      aria-describedby="Food description and selection button"
    >
      <ButtonClose onClick={onClose} isDark />
      <FoodImage className={classes.img} cover={coverImage} />
      <DialogTitle>
        <span className={classes.title}>{title}</span>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.contentDescription}>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <Typography
            className={classes.price}
            variant="subtitle1"
            color="textSecondary"
          >
            {price}
          </Typography>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};
