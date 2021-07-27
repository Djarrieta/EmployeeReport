import { addEmployService } from '../services/addEmployService';
import { clearHoursService } from '../services/clearHoursService';
import { deleteEmployService } from '../services/deleteEmployService';

test('addEmployService', async () => {
  const response = await addEmployService('EmployName')
    .then(() => 'ok')
    .catch(() => 'error');
  expect(response).toBe('error');
});

test('clearHoursService', async () => {
  const response = await clearHoursService()
    .then(() => 'ok')
    .catch(() => 'error');
  expect(response).toBe('error');
});

test('deleteEmployService', async () => {
  const response = await deleteEmployService(1)
    .then(() => 'ok')
    .catch(() => 'error');
  expect(response).toBe('error');
});
