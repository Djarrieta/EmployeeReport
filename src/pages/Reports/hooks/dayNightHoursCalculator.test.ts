import { dayNightHoursCalculator } from './dayNightHoursCalculator';

test('dayNightHoursCalculator', () => {
  const totalHours = dayNightHoursCalculator('2021-01-01', '2021-01-01', 4, 7);

  expect(totalHours === { HD: 1, HN: 2 });
});
