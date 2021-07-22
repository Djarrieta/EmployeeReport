import { Container, List, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { EmployeeItem } from './components/EmployeeItem';
import { EmployeeModel } from './models/EmployeeModel';

export const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          console.log('add');
        }}
      >
        +
      </button>

      <div>
        <Typography variant="h6">Employees</Typography>
        <div>
          <List>
            {employees.map((employee) => {
              return <EmployeeItem employee={employee} />;
            })}
          </List>
        </div>
      </div>
    </Container>
  );
};
