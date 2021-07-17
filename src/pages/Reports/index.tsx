import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

export const ReportPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="body2" align="center" color="textSecondary">
        REPORT
      </Typography>
      <TextField label="Employ" />
      <TextField label="Start" />
      <TextField label="End" />
    </Container>
  );
};
