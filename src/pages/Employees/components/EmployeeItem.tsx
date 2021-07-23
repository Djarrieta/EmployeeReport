import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  ListItemText,
} from '@material-ui/core';
import { Delete, Person } from '@material-ui/icons';
import { EmployeeModel } from '../models/EmployeeModel';
import '../styles/Employees.scss';

export const EmployeeItem = (props: {
  employee: EmployeeModel;
  handleDelete: (employId: number | undefined) => void;
}): JSX.Element => {
  const { employee, handleDelete } = props;
  return (
    <ListItem className="employees_item">
      <ListItemAvatar>
        <Avatar>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Box display="flex" flexDirection="column" marginRight={3}>
          <Typography variant="body2">{`id:${employee.id}`} </Typography>
          <Typography variant="h6">{employee.name} </Typography>
        </Box>
      </ListItemText>

      <ListItemText>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{`HD:${employee.HD}`}</Typography>
          <Typography variant="body1">{`HN:${employee.HN}`}</Typography>
        </Box>
      </ListItemText>

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
