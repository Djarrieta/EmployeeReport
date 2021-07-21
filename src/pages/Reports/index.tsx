import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { EmployeeModel } from 'pages/Employees/models/EmployeeModel';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { dateFormat, hoursArray } from 'utils/date';
import { dayNightHoursCalculator } from 'pages/Reports/hooks/dayNightHoursCalculator';
import { employeesService } from '../Employees/services/employeesService';

export const ReportPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    moment().format(dateFormat),
  );
  const [finishDate, setFinishDate] = useState<string>(
    moment().format(dateFormat),
  );
  const [startTime, setStartTime] = useState<number>(7);
  const [finishTime, setFinishTime] = useState<number>(18);
  const [employeeError, setEmployeeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  useEffect(() => {
    employeesService().then((employeesList) => setEmployees(employeesList));
  }, []);

  useEffect(() => {
    setEmployeeError(false);
    setDateError(false);

    if (selectedEmployeeId === '') {
      setEmployeeError(true);
    }
    if (startDate > finishDate) {
      setDateError(true);
    }
    if (startDate === finishDate && startTime > finishTime) {
      setDateError(true);
    }
  }, [selectedEmployeeId, startDate, finishDate, startTime, finishTime]);

  const save = () => {
    const totalHours = dayNightHoursCalculator(
      startDate,
      finishDate,
      startTime,
      finishTime,
    );
    console.log(totalHours);
  };

  return (
    <form>
      {/* Employee */}
      <div>
        <InputLabel id="employeeLabel">Employee</InputLabel>
        <Select
          error={employeeError}
          labelId="employeeLabel"
          value={selectedEmployeeId}
          onChange={({ target: value }) =>
            setSelectedEmployeeId(value.value as string)
          }
        >
          {employees.map((employee) => (
            <MenuItem key={employee.id} value={employee.id}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* Start */}
      <div>
        <span>Start</span>
        <TextField
          type="date"
          value={moment(startDate).format(dateFormat)}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <div>
          <InputLabel id="startTimeLabel">Start Hour</InputLabel>
          <Select
            labelId="startTimeLabel"
            value={startTime}
            onChange={({ target: value }) =>
              setStartTime(value.value as number)
            }
          >
            {hoursArray.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      {/* Finish */}
      <div>
        <span>Finish</span>
        <TextField
          type="date"
          value={moment(finishDate).format(dateFormat)}
          onChange={(event) => setFinishDate(event.target.value)}
          error={dateError}
        />
        <div>
          <InputLabel id=" finisTimeLabel">Finish Hour</InputLabel>
          <Select
            labelId="finisTimeLabel"
            value={finishTime}
            onChange={({ target: value }) =>
              setFinishTime(value.value as number)
            }
          >
            {hoursArray.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <Button onClick={() => save()}>Save</Button>
    </form>
  );
};
