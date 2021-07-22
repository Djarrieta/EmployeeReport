import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
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

export const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const refreshEmployeesList = () => {
    employeesService().then((response) => setEmployees(response));
  };

  useEffect(() => {
    refreshEmployeesList();
  }, []);
  const handleAdd = () => {
    addEmployService(newEmployeeName).then(() => {
      refreshEmployeesList();
      setNewEmployeeName('');
    });
  };
  const handleDelete = (employeId: number | undefined) => {
    deleteEmployService(employeId).then(() => refreshEmployeesList());
  };
  const handleClearHours = () => {
    clearHoursService().then(() => refreshEmployeesList());
  };

  return (
    <Container>
      <div>
        <TextField
          label="New Employee name"
          value={newEmployeeName}
          onChange={(event) => setNewEmployeeName(event.target.value)}
          onKeyPress={(event) => {
            if (event.code === 'Enter') {
              handleAdd();
            }
          }}
        />
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleClearHours}>Clear Hours</Button>
      </div>
      <div>
        <Typography variant="h6">Employees</Typography>
        <div>
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
        </div>
      </div>
    </Container>
  );
};
