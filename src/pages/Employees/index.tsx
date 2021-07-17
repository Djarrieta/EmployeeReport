import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
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
      <ol>
        {employees.map((employee) => {
          return (
            <li>
              <span> {employee.name}</span>
              <span> HD: {employee.HD}</span>
              <span> HN: {employee.HN}</span>
              <button
                type="button"
                onClick={() => {
                  console.log('delete');
                }}
              >
                -
              </button>
            </li>
          );
        })}
      </ol>
    </Container>
  );
};
