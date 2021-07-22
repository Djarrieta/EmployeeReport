import React from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete, Person } from '@material-ui/icons';
import { EmployeeModel } from '../models/EmployeeModel';

export const EmployeeItem = (props: { employee: EmployeeModel }) => {
  const { employee } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={employee.name} />
      <ListItemText primary={employee.HD} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
