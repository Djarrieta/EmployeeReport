import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import {
  Box,
  Button,
  List,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { SessionContext } from 'context/SessionContext';
import { RouteComponentProps } from 'react-router-dom';
import { ContainerBox } from '../../components/ContainerBox/ContainerBox';
import { EmployeeModel } from './models/EmployeeModel';
import { addEmployService } from './services/addEmployService';
import { clearHoursService } from './services/clearHoursService';
import { deleteEmployService } from './services/deleteEmployService';
import { employeesService } from './services/employeesService';

import './styles/Employees.scss';

const EmployeeItem = lazy(() =>
  import('./components/EmployeeItem').then((result) => {
    return { default: result.EmployeeItem };
  }),
);

export const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const [errorName, setErrorName] = useState<boolean>(false);
  const {
    data: { username },
    mutations: { setAlert },
  } = useContext(SessionContext);

  const refreshEmployeesList = () => {
    employeesService().then((response) => setEmployees(response));
  };

  useEffect(() => {
    refreshEmployeesList();
  }, []);
  const handleAdd = () => {
    if (!newEmployeeName) {
      setErrorName(true);
      setAlert(`${username}, there is no name for the new employee.`);
      return;
    }
    addEmployService(newEmployeeName)
      .then(() => {
        refreshEmployeesList();
        setAlert(`${newEmployeeName} has been created.`);
        setNewEmployeeName('');
      })
      .catch(() => setAlert('There was a problem creating the new employee.'));
  };
  const handleDelete = (employeId: number | undefined) => {
    deleteEmployService(employeId)
      .then(() => {
        setAlert('Employee deleted.');
        refreshEmployeesList();
      })
      .catch(() => setAlert('There was a problem deleting the employee.'));
  };
  const handleClearHours = () => {
    clearHoursService()
      .then(() => {
        setAlert('Reported hours reseted.');
        refreshEmployeesList();
      })
      .catch(() => setAlert('There was a problem reseting hours.'));
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    setErrorName(false);
    if (event.code === 'Enter') {
      handleAdd();
    }
  };

  return (
    <ContainerBox name="Employees">
      <div>
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
          <Box>
            <Button variant="contained" size="small" onClick={handleClearHours}>
              Restart
            </Button>
          </Box>
        </Box>

        <Box marginTop={3}>
          <List>
            <Suspense fallback={<CircularProgress />}>
              {employees.map((employee) => {
                return (
                  <EmployeeItem
                    key={employee.id}
                    employee={employee}
                    handleDelete={(employeId: number | undefined) =>
                      handleDelete(employeId)
                    }
                  />
                );
              })}
            </Suspense>
          </List>
        </Box>
      </div>
    </ContainerBox>
  );
};
