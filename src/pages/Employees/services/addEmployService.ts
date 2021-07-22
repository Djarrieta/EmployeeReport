import axios from 'axios';
import { URL } from '../../../constants/URL';

export const addEmployService = (employeeName: string): void => {
  axios
    .post(`${URL}/employees`, { name: employeeName, HD: 0, HN: 0 })
    .then((response) => response.data);
};
