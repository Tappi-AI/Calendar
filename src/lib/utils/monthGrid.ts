// src/lib/utils/monthGrid.ts
import { DateTime } from 'luxon';

export interface MonthCell {
	date: DateTime;
	inCurrentMonth: boolean;
	isToday: boolean;
}

export function getMonthGrid(current: DateTime): MonthCell[] {
	const startOfMonth = current.startOf('month');
	const endOfMonth = current.endOf('month');

	// Day of week index (0=Monday… or 0=Sunday depending on locale)
	// Google Calendar uses Sunday start → set explicitly:
	const weekStart = 7; // 7 = Sunday
	const startWeekday = startOfMonth.weekday % weekStart; // convert Luxon → 0–6 Sun start

	// First visible day in the calendar grid
	const firstGridDay = startOfMonth.minus({ days: startWeekday });

	const grid: MonthCell[] = [];

	for (let i = 0; i < 42; i++) {
		const date = firstGridDay.plus({ days: i });

		grid.push({
			date,
			inCurrentMonth: date.hasSame(current, 'month'),
			isToday: date.hasSame(DateTime.now(), 'day')
		});
	}
	return grid;
}
