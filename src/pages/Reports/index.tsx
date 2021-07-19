import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { EmployeeModel } from 'pages/Employees/models/EmployeeModel';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { dateFormat } from 'utils/text';

export const ReportPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [reportData, setReportData] = useState<{
    employ: string | unknown | undefined;
    start: string;
    finish: string;
  }>({
    employ: '',
    start: dateFormat(new Date()),
    finish: dateFormat(new Date()),
  });
  const [employeeError, setEmployeeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  useEffect(() => {
    if (reportData.employ === '') {
      setEmployeeError(true);
    } else {
      setEmployeeError(false);
    }
    if (reportData.start > reportData.finish) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [reportData]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <FormControl>
      <InputLabel id="employeeLabel">Employee</InputLabel>
      <Select
        error={employeeError}
        labelId="employeeLabel"
        value={reportData.employ}
        onChange={({ target: value }) =>
          setReportData({ ...reportData, employ: value.value })
        }
      >
        {employees.map((employee) => (
          <MenuItem key={employee.id} value={employee.name}>
            {employee.name}
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Start"
        type="datetime-local"
        value={reportData.start}
        onChange={(event) =>
          setReportData({ ...reportData, start: event.target.value })
        }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Finish"
        type="datetime-local"
        value={reportData.finish}
        onChange={(event) =>
          setReportData({ ...reportData, finish: event.target.value })
        }
        error={dateError}
        helperText="Invalid finish date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={() => console.log(reportData)}>Save</Button>
    </FormControl>
  );
};
