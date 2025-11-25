// src/lib/stores/calendarStore.ts
import { writable } from 'svelte/store';
import { DateTime } from 'luxon';

export type CalendarLayout = 'year' | 'month' | 'week' | 'day';

export const LAYOUTS: Record<string, CalendarLayout> = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
};

export interface CalendarState {
  layout: CalendarLayout;
  today: DateTime;
  currentDate: DateTime; // UI's current focus (month/week/day)
}

const today = DateTime.now();

export const calendarStore = writable<CalendarState>({
  layout: LAYOUTS.MONTH,
  today,
  currentDate: today
});

// ---------- Actions ----------
export const setLayout = (layout: CalendarLayout) => {
  calendarStore.update((s) => ({ ...s, layout }));
};

export const setCurrentDate = (date: DateTime) => {
  calendarStore.update((s) => ({ ...s, currentDate: date }));
};

export const goToToday = () => {
  const now = DateTime.now();
  calendarStore.update((s) => ({
    ...s,
    today: now,
    currentDate: now
  }));
};
