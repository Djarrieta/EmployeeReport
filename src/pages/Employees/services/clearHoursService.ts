import axios from 'axios';
import { URL } from '../../../constants/URL';
import { employeesService } from './employeesService';

export const clearHoursService = async (): Promise<void> => {
  const employeesList = await employeesService();

  employeesList.forEach(async (employee) => {
    await axios
      .patch(`${URL}/employees/${employee.id}`, {
        HD: 0,
        HN: 0,
      })
      .catch(() => 'error');
  });
};
