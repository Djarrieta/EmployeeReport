import axios from 'axios';
import { URL } from '../../../constants/URL';

export const deleteEmployService = async (
  employId: number | undefined,
): Promise<void> => {
  if (employId) {
    await axios
      .delete(`${URL}/employees/${employId}`)
      .then((response) => response.data);
  }
};
