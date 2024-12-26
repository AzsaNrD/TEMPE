import {
  format,
  parseISO,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  isPast,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import { id } from 'date-fns/locale';

export function formatIndonesianDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'd MMMM yyyy', { locale: id });
}

export function calculateTimeToDeadline(dateString: string): string {
  const now = new Date();
  const deadline = parseISO(dateString);

  if (isPast(deadline)) {
    const yearsOverdue = differenceInYears(now, deadline);
    const monthsOverdue = differenceInMonths(now, deadline);
    const daysOverdue = differenceInDays(now, deadline);
    const hoursOverdue = differenceInHours(now, deadline);

    if (yearsOverdue >= 1) {
      return `${yearsOverdue} tahun yang lalu`;
    } else if (monthsOverdue >= 1) {
      return `${monthsOverdue} bulan yang lalu`;
    } else if (daysOverdue >= 1) {
      return `${daysOverdue} hari yang lalu`;
    } else {
      return `${hoursOverdue} jam yang lalu`;
    }
  } else {
    const yearsLeft = differenceInYears(deadline, now);
    const monthsLeft = differenceInMonths(deadline, now);
    const daysLeft = differenceInDays(deadline, now);
    const hoursLeft = differenceInHours(deadline, now);
    const minutesLeft = differenceInMinutes(deadline, now);

    if (yearsLeft >= 1) {
      return `${yearsLeft} tahun lagi`;
    } else if (monthsLeft >= 1) {
      return `${monthsLeft} bulan lagi`;
    } else if (daysLeft >= 1) {
      return `${daysLeft} hari lagi`;
    } else if (hoursLeft >= 1) {
      return `${hoursLeft} jam lagi`;
    } else {
      return `${minutesLeft} menit lagi`;
    }
  }
}
