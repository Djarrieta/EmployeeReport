import moment from 'moment';
import { HoursModel } from 'pages/Reports/models/HoursModel';
import { dateFormat } from 'utils/date';

const DAY_INIT = 6;
const NIGHT_INIT = 18;
const HOURS_DAY = 24;

const dayNightSelector = (hour: number) => {
  let HD = 0;
  let HN = 0;

  if (hour < DAY_INIT || hour >= NIGHT_INIT) {
    HN = +1;
  }
  if (hour >= DAY_INIT && hour < NIGHT_INIT) {
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
    const firstDayHours = Array.from(
      [...Array(HOURS_DAY - startTime)],
      (i, n) => dayNightSelector(n + startTime),
    );

    const lastDayHours = Array.from([...Array(finishTime)], (i, n) =>
      dayNightSelector(n),
    );

    let middleDaysHours: HoursModel[] = [];
    const diffDays = moment(finishDay).diff(startDay, 'days');
    if (diffDays > 1) {
      middleDaysHours = Array.from(
        [...Array(HOURS_DAY * (diffDays - 1))],
        (i, n) => dayNightSelector(n),
      );
    }

    totalHours = [...firstDayHours, ...middleDaysHours, ...lastDayHours];
  }

  HD = totalHours.reduce((acc, el) => acc + el.HD, 0);
  HN = totalHours.reduce((acc, el) => acc + el.HN, 0);
  return { HD, HN };
};
