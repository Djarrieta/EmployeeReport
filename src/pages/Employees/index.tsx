import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  List,
  TextField,
  Typography,
} from '@material-ui/core';
import { EmployeeItem } from './components/EmployeeItem';
import { EmployeeModel } from './models/EmployeeModel';
import { employeesService } from './services/employeesService';
import { deleteEmployService } from './services/deleteEmployService';
import { addEmployService } from './services/addEmployService';
import { clearHoursService } from './services/clearHoursService';
import './styles/Employees.scss';

export const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const [errorName, setErrorName] = useState<boolean>(false);
  const refreshEmployeesList = () => {
    employeesService().then((response) => setEmployees(response));
  };

  useEffect(() => {
    refreshEmployeesList();
  }, []);
  const handleAdd = () => {
    setErrorName(false);
    if (newEmployeeName) {
      addEmployService(newEmployeeName).then(() => {
        refreshEmployeesList();
        setNewEmployeeName('');
      });
    } else {
      setErrorName(true);
    }
  };
  const handleDelete = (employeId: number | undefined) => {
    deleteEmployService(employeId).then(() => refreshEmployeesList());
  };
  const handleClearHours = () => {
    clearHoursService().then(() => refreshEmployeesList());
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    setErrorName(false);
    if (event.code === 'Enter') {
      handleAdd();
    }
  };

  return (
    <Container maxWidth="sm" className="main">
      <Box marginTop={5}>
        <Typography variant="h4">Employees</Typography>
      </Box>

      <Box className="employees_new">
        <Box display="flex" alignItems="center">
          <TextField
            label="Name"
            error={errorName}
            value={newEmployeeName}
            onChange={(event) => setNewEmployeeName(event.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Box marginX={2}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>
        <Button variant="contained" onClick={handleClearHours}>
          Restart
        </Button>
      </Box>

      <Box>
        <List>
          {employees.map((employee) => {
            return (
              <EmployeeItem
                key={employee.id}
                employee={employee}
                handleDelete={(employeId) => handleDelete(employeId)}
              />
            );
          })}
        </List>
      </Box>
    </Container>
  );
};
