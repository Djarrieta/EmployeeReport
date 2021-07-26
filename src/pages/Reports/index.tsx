import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from 'context/SessionContext';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { ContainerBox } from 'components/ContainerBox/ContainerBox';
import { EmployeeModel } from 'pages/Employees/models/EmployeeModel';
import { dayNightHoursCalculator } from 'pages/Reports/hooks/dayNightHoursCalculator';
import { dateFormat } from 'utils/date';
import { employeesService } from '../Employees/services/employeesService';
import { DateTimePickerCustom } from './components/DateTimePickerCustom';
import { addHoursService } from './services/addHoursService';

const initialTime = { start: 7, finish: 19 };

export const ReportPage: React.FC<RouteComponentProps> = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    moment().format(dateFormat),
  );
  const [finishDate, setFinishDate] = useState<string>(
    moment().format(dateFormat),
  );
  const [startTime, setStartTime] = useState<number>(initialTime.start);
  const [finishTime, setFinishTime] = useState<number>(initialTime.finish);
  const [employeeError, setEmployeeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const {
    data: { username },
    mutations: { setAlert },
  } = useContext(SessionContext);

  useEffect(() => {
    employeesService()
      .then((employeesList) => setEmployees(employeesList))
      .catch(() => setAlert('There was a problem loading the employees list.'));
  }, [setAlert]);

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
    if (employeeError) {
      setAlert(`${username}, theres is no employee selected.`);
      return;
    }
    if (dateError) {
      setAlert(`${username}, finish date can´t be earlier than start date.`);
      return;
    }
    const totalHours = dayNightHoursCalculator(
      startDate,
      finishDate,
      startTime,
      finishTime,
    );
    addHoursService(totalHours, selectedEmployeeId).catch(() =>
      setAlert('There was a problem adding hours to this employee.'),
    );
    setAlert(
      `${totalHours.HD}/day and ${totalHours.HN}/night have been reported.`,
    );
  };

  return (
    <ContainerBox name="Reports">
      <Box display="flex" flexDirection="column" maxWidth="xs">
        <FormControl>
          <InputLabel id="inputLabelEmployee">Employee</InputLabel>
          <Select
            labelId="inputLabelEmployee"
            error={employeeError}
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
          {!employeeError && <FormHelperText>Incorrect entry.</FormHelperText>}
        </FormControl>
        <DateTimePickerCustom
          name="Start"
          date={startDate}
          time={startTime}
          setDate={setStartDate}
          setTime={setStartTime}
          errorIndicator={false}
        />
        <DateTimePickerCustom
          name="Finish"
          date={finishDate}
          time={finishTime}
          setDate={setFinishDate}
          setTime={setFinishTime}
          errorIndicator={dateError}
        />
        <Box marginTop={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => save()}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ContainerBox>
  );
};
