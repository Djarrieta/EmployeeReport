import axios from 'axios';
import { URL } from '../../../constants/URL';

export const deleteEmployService = async (employId: number | undefined) => {
  if (employId) {
    await axios
      .delete(`${URL}/employees/${employId}`)
      .then((response) => console.log(response.data));
  }
};
