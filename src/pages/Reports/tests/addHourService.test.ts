import { addHoursService } from '../services/addHoursService';

test('addHoursService', () => {
  addHoursService({ HD:1, HN: 1 }, '6').then((response) =>
    console.log(response),
  );
});
