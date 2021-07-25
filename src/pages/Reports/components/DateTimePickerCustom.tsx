import React from 'react';
import moment from 'moment';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { dateFormat, hoursArray } from '../../../utils/date';

export const DateTimePickerCustom = (props: {
  name: string;
  date: string;
  time: number;
  errorIndicator: boolean;
  setTime: (value: number) => void;
  setDate: (value: string) => void;
}): JSX.Element => {
  const { name, time, date, errorIndicator, setTime, setDate } = props;
  return (
    <Box marginTop={2}>
      <Typography>{name}</Typography>
      <FormControl>
        <InputLabel id="timeLabel">Hour</InputLabel>
        <Select
          labelId="timeLabel"
          error={errorIndicator}
          value={time}
          onChange={({ target: value }) => setTime(value.value as number)}
        >
          {hoursArray.map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          label="Date"
          error={errorIndicator}
          type="date"
          value={moment(date).format(dateFormat)}
          onChange={(event) => setDate(event.target.value)}
        />
        {errorIndicator && <FormHelperText>Incorrect entry.</FormHelperText>}
      </FormControl>
    </Box>
  );
};
