import axios from 'axios';
import { EmployeeModel } from '../models/EmployeeModel';
import { URL } from '../../../constants/URL';

export const employeesService = async (): Promise<EmployeeModel[]> => {
  return axios
    .get(`${URL}/employees`)
    .then((response) => response.data)
    .catch((error) => error);
};
