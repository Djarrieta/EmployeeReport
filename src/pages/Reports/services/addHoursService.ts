import axios from 'axios';
import { URL } from '../../../constants/URL';
import { HoursModel } from '../models/HoursModel';

export const addHoursService = async (
  hours: HoursModel,
  employeeId: string,
) => {
  const employData = await axios
    .get(`${URL}/employees/${employeeId}`)
    .then((response) => response);
  const currentHD: number = employData.data.HD ?? 0;
  const currentHN: number = employData.data.HN ?? 0;
  const totalHours = { HD: currentHD + hours.HD, HN: currentHN + hours.HN };

  return axios
    .patch(`${URL}/employees/${employeeId}`, totalHours)
    .then((response) => response.data)
    .catch((error) => error);
};
