import axios from 'axios';
import { URL } from '../../../constants/URL';

export const addEmployService = async (employeeName: string): Promise<void> => {
  await axios
    .post(`${URL}/employees`, { name: employeeName, HD: 0, HN: 0 })
    .then((response) => response.data)
    .catch(() => 'error');
};
