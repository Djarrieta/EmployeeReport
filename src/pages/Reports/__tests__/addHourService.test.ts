import { addHoursService } from '../services/addHoursService';

test('addHoursService', async () => {
  const response = await addHoursService({ HD: 1, HN: 1 }, '6');
  expect(response.name).toBe('Darío');
});
