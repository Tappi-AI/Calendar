<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { DateTime } from 'luxon';

  import {
    calendarStore,
    setCurrentDate,
    setLayout,
    LAYOUTS
  } from '$lib/stores/calendarStore';

  import { monthGrid } from '$lib/stores/derivedCalendar';

  // 🌟 SVELTE 5 LOCAL STATE
  let selectedDate = $state(DateTime.now()); // default: today

  // helper for comparing dates
  const isSameDate = (a: DateTime, b: DateTime) =>
    a.toISODate() === b.toISODate();
</script>

<!-- ===================== HEADER ===================== -->
<div class="header">
  <button onclick={() => setCurrentDate($calendarStore.currentDate.minus({ months: 1 }))}>
    ‹
  </button>

  <h2>{$calendarStore.currentDate.toFormat('MMMM yyyy')}</h2>

  <button onclick={() => setCurrentDate($calendarStore.currentDate.plus({ months: 1 }))}>
    ›
  </button>

  <button class="today-btn" onclick={() => {
    const today = DateTime.now();
    setCurrentDate(today);
    selectedDate = today;
  }}>
    Today
  </button>

  <div class="layout-switch">
    <button onclick={() => setLayout(LAYOUTS.MONTH)}>Month</button>
    <button onclick={() => setLayout(LAYOUTS.WEEK)}>Week</button>
    <button onclick={() => setLayout(LAYOUTS.DAY)}>Day</button>
  </div>
</div>

<!-- ===================== MONTH GRID ===================== -->
<div class="month-grid">
{#each $monthGrid as cell}
  <div
    class="
      cell
      {cell.inCurrentMonth ? '' : 'other-month'}
      {cell.isToday ? 'today' : ''}
      {isSameDate(cell.date, selectedDate) ? 'selected' : ''}
    "
    role="button"
    tabindex="0"
    onclick={() => selectedDate = cell.date}
    onkeydown={(e) => e.key === 'Enter' && (selectedDate = cell.date)}
  >
    <span class="date">{cell.date.day}</span>
  </div>
{/each}

</div>

<style>
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
  }

  .header h2 {
    margin: 0;
    font-size: 1.25rem;
    flex-grow: 1;
  }

  .today-btn {
    padding: 4px 10px;
    border-radius: 4px;
    background: #3b82f6;
    color: white;
    border: none;
  }

  .layout-switch button {
    margin-left: 4px;
  }

  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    height: calc(100vh - 80px);
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .cell {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 6px;
    position: relative;
    user-select: none;
    cursor: pointer;
  }

  .other-month {
    background: #fafafa;
    color: #b3b3b3;
  }

  .today {
    background: #eaf3ff;
    border: 2px solid #4a8dff;
    z-index: 2;
  }

  .selected {
    outline: 3px solid #2563eb;
    background: #e0edff;
    z-index: 3;
  }

  .date {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
