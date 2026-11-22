import { todayISO } from './validate.js';

/**
 * Event status is derived from the date, so listings never go stale:
 * today or later → 'Upcoming', earlier → 'Completed'.
 */
export const eventStatus = (e) => (e.date >= todayISO() ? 'Upcoming' : 'Completed');
export const isUpcoming = (e) => eventStatus(e) === 'Upcoming';

/** Upcoming first (soonest first), then completed (most recent first). */
export const byStatusThenDate = (a, b) => {
  const ua = isUpcoming(a);
  const ub = isUpcoming(b);
  if (ua !== ub) return ua ? -1 : 1;
  return ua ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
};

export const upcomingEvents = (list) => list.filter(isUpcoming).sort(byStatusThenDate);
