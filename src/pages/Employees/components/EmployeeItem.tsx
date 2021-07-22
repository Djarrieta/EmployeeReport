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

export const EmployeeItem = (props: {
  employee: EmployeeModel;
  handleDelete: (employId: number | undefined) => void;
}): JSX.Element => {
  const { employee, handleDelete } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={employee.name} />
      <ListItemText primary={employee.id} />
      <ListItemText primary={`HD:${employee.HD}`} />
      <ListItemText primary={`HN:${employee.HN}`} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(employee.id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
