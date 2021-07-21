import moment from 'moment';
import { HoursModel } from 'pages/Reports/models/HoursModel';
import { dateFormat } from 'utils/date';

const dayNightSelector = (hour: number) => {
  let HD = 0;
  let HN = 0;

  if (hour < 6 || hour >= 18) {
    HN = +1;
  }
  if (hour >= 6 && hour < 18) {
    HD = +1;
  }
  return { HD, HN };
};

export const dayNightHoursCalculator = (
  startDate: string,
  finishDate: string,
  startTime: number,
  finishTime: number,
): { HD: number; HN: number } => {
  let HD = 0;
  let HN = 0;
  const startDay = moment(startDate).format(dateFormat);
  const finishDay = moment(finishDate).format(dateFormat);

  let totalHours: HoursModel[] = [];

  if (startDay === finishDay) {
    totalHours = Array.from([...Array(finishTime - startTime)], (i, n) =>
      dayNightSelector(n + startTime),
    );
  }
  if (finishDay > startDay) {
    const firstDayHours = Array.from([...Array(24 - startTime)], (i, n) =>
      dayNightSelector(n + startTime),
    );

    const lastDayHours = Array.from([...Array(finishTime)], (i, n) =>
      dayNightSelector(n),
    );

    let middleDaysHours: HoursModel[] = [];
    const diffDays = moment(finishDay).diff(startDay, 'days');
    if (diffDays > 1) {
      middleDaysHours = Array.from([...Array(24 * (diffDays - 1))], (i, n) =>
        dayNightSelector(n),
      );
    }

    totalHours = [...firstDayHours, ...middleDaysHours, ...lastDayHours];
  }

  HD = totalHours.reduce((acc, el) => acc + el.HD, 0);
  HN = totalHours.reduce((acc, el) => acc + el.HN, 0);
  return { HD, HN };
};
