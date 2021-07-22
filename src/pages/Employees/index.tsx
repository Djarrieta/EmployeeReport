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

export const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const refreshEmployeesList = async () => {
    await employeesService().then((response) => setEmployees(response));
  };

  useEffect(() => {
    refreshEmployeesList();
  }, []);
  const handleAdd = async () => {
    await addEmployService(newEmployeeName);
    await refreshEmployeesList();
  };
  const handleDelete = async (employeId: number | undefined) => {
    await deleteEmployService(employeId);
    await refreshEmployeesList();
  };

  return (
    <Container>
      <div>
        <TextField
          label="New Employee name"
          value={newEmployeeName}
          onChange={(event) => setNewEmployeeName(event.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
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
