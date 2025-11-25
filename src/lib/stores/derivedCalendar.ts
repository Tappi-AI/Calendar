// src/lib/stores/derivedCalendar.ts
import { derived } from 'svelte/store';
import { calendarStore } from './calendarStore';
import { getMonthGrid, type MonthCell } from '$lib/utils/monthGrid';

export const monthGrid = derived(calendarStore, ($store) => {
	return getMonthGrid($store.currentDate);
});
